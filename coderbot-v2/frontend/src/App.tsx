import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { pb } from "@/integrations/pocketbase/client";
import { RequireRole } from "@/components/auth/RequireRole";
import posthog from "posthog-js";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsConsentBanner } from "@/components/consent/AnalyticsConsentBanner";
import { ConsentStatus, consentStorageKey, getAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics-consent";
import { useMobileDetection } from "@/hooks/useMobileDetection";
import MobileLayout from "@/components/layout/MobileLayout";
import MobileHome from "@/components/mobile/MobileHome";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { gamificationService } from "@/services/gamification/GamificationService";
import { AchievementDetectors } from "@/components/gamification/AchievementDetectors";
import { NotificationProvider } from "@/context/NotificationContext";
import { ExamplesProvider } from "@/context/ExamplesContext";
import { CodeEditorProvider } from "@/context/CodeEditorContext";
import Auth from "./pages/Auth";
import CodeEditorPage from "./pages/CodeEditorPage";

// Lazy loading otimizado com preload para rotas críticas
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
import ChatInterface from "./pages/ChatInterface";
const ExerciseInterface = React.lazy(() => import("./pages/ExerciseInterface"));
// const TeacherDashboard = React.lazy(() => import("./pages/teacher/Dashboard"));
import StudentDashboard from "./pages/StudentDashboard";
import { TeacherStudentFallback, TeacherUnknownFallback } from "./pages/teacher/TeacherAccessFallback";
const Whiteboard = React.lazy(() => import("./pages/Whiteboard"));
const Home = React.lazy(() => import("./home/Home"));
const AboutProject = React.lazy(() => import("./pages/AboutProject"));
const NotesPage = React.lazy(() => import("./pages/NotesPage"));
const ConsentTerms = React.lazy(() => import("./pages/ConsentTerms"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const ClassForum = React.lazy(() => import("./pages/ClassForum"));
const PublicClasses = React.lazy(() => import("./pages/PublicClasses"));
const NotificationsTest = React.lazy(() => import("./pages/NotificationsTest"));
const UserInfo = React.lazy(() => import("./pages/UserInfo"));

const queryClient = new QueryClient();

const App = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => getAnalyticsConsent());
  const analyticsInitRef = useRef(false);

  const resetAnalytics = useCallback(() => {
    if (typeof window === 'undefined') return;
    posthog?.opt_out_capturing?.();
    posthog?.reset?.();
    try {
      delete (window as any).posthog;
    } catch (_) {
      (window as any).posthog = undefined;
    }
    analyticsInitRef.current = false;
  }, []);

  const initializeAnalytics = useCallback(() => {
    if (analyticsInitRef.current) return;
    if (typeof window === 'undefined') return;

    const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || import.meta.env.VITE_POSTHOG_KEY;
    const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

    // console.info('[Analytics] PostHog env', { hasKey: Boolean(posthogKey), host: posthogHost });

    if (!posthogKey) return;

    analyticsInitRef.current = true;

    posthog.init(posthogKey, {
      api_host: posthogHost,
      capture_pageview: false,
      autocapture: true,
      disable_session_recording: true,
      debug: false, // Desabilitado para reduzir logs
      request_batching: false,
    });

    (window as any).posthog = posthog;

    // Removido wrapper de console.debug para capture
    // const __originalCapture = (posthog.capture as any)?.bind?.(posthog);
    // if (__originalCapture) {
    //   (posthog as any).capture = (event: string, props?: Record<string, any>) => {
    //     console.debug('[Analytics][capture]', event, props);
    //     return __originalCapture(event, props);
    //   };
    // }

    posthog.capture('edu_debug_boot', { path: window.location.pathname });

    // Move userId declaration outside of async context
    const userModel = pb.authStore.model as any;
    const userId = userModel?.id;
    if (userId) {
      posthog.identify(userId, {
        role: userModel?.role ?? undefined,
      });
    }

    const loadWebVitalsScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if ((window as any).webVitals) return resolve();
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js';
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('web-vitals load error'));
        document.head.appendChild(s);
      });
    };

    // Initialize Web Vitals tracking
    loadWebVitalsScript().then(() => {
      const wv = (window as any).webVitals;
      if (!wv) {
        // console.warn('[Analytics][web-vitals] Not available after load');
        return;
      }
      const nav = performance.getEntriesByType('navigation')[0] as any;
      const send = (metric: any) => {
        try {
          // console.debug('[Analytics][web-vitals][report]', metric?.name, metric?.value, metric);
          posthog.capture('$web_vitals', {
            metric_name: metric?.name,
            value: metric?.value,
            delta: metric?.delta,
            id: metric?.id,
            rating: metric?.rating,
            path: window.location.pathname,
            navigation_type: nav?.type,
          });
        } catch (e) {
          // console.warn('[Analytics][web-vitals] capture failed', e);
        }
      };
      wv.onCLS?.(send, { reportAllChanges: true });
      wv.onFID?.(send);
      wv.onLCP?.(send);
      wv.onTTFB?.(send);
      wv.onINP?.(send, { reportAllChanges: true });
      wv.onFCP?.(send);
    }).catch((e) => {
      // console.warn('[Analytics] Web Vitals load failed', e);
    });
  }, []);

  useEffect(() => {
    if (consentStatus === 'granted') {
      initializeAnalytics();
      posthog?.opt_in_capturing?.();
    } else if (consentStatus === 'denied') {
      resetAnalytics();
    }
  }, [consentStatus, initializeAnalytics, resetAnalytics]);

  // 🎮 Initialize Gamification Service
  useEffect(() => {
    const initGamification = async () => {
      try {
        if (!gamificationService.isInitialized()) {
          await gamificationService.initialize();
          console.log('[App] 🎮 Gamification Service initialized');
        }
      } catch (error) {
        console.error('[App] Failed to initialize Gamification Service:', error);
      }
    };

    // Inicializar quando usuário estiver autenticado
    if (pb.authStore.isValid) {
      initGamification();
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== consentStorageKey) return;
      const nextStatus = event.newValue === 'granted' || event.newValue === 'denied' ? (event.newValue as ConsentStatus) : 'unknown';
      setConsentStatus(nextStatus);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleConsentAccept = useCallback(() => {
    setAnalyticsConsent('granted');
    setConsentStatus('granted');
  }, []);

  const handleConsentDecline = useCallback(() => {
    setAnalyticsConsent('denied');
    setConsentStatus('denied');
    resetAnalytics();
  }, [resetAnalytics]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <NotificationProvider>
            <ExamplesProvider>
              <CodeEditorProvider>
              <Toaster />
              <Sonner />
            <AnalyticsConsentBanner
              open={consentStatus === 'unknown'}
              onAccept={handleConsentAccept}
              onDecline={handleConsentDecline}
            />
            <BrowserRouter>
              <AnalyticsTracker enabled={consentStatus === 'granted'} />
              <PWAInstallPrompt />
              {/* 🎮 Detectores de Achievements Globais */}
              <AchievementDetectors />
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Carregando CoderBot...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preparando sua experiência educacional</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomeWithMobileSupport />} />
                  <Route path="/about" element={<AboutProject />} />
                  <Route path="dashboard" element={<RequireAuth><Index /></RequireAuth>}>
                    <Route path="chat" element={<ChatInterface />} />
                    <Route path="exercises" element={<ExerciseInterface />} />
                    <Route path="student" element={<StudentDashboard />} />
                    <Route path="whiteboard" element={<Whiteboard />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="code-editor" element={<CodeEditorPage />} />
                  </Route>
                  {/* Teacher module is handled by nginx and served from separate container */}
                  <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/consent" element={<ConsentTerms />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/class/:classId" element={<ClassForum />} />
                  <Route path="/classes" element={<PublicClasses />} />
                  <Route path="/notifications-test" element={<NotificationsTest />} />
                  <Route path="/user-info" element={<RequireAuth><UserInfo /></RequireAuth>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            </CodeEditorProvider>
            </ExamplesProvider>
          </NotificationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

const AnalyticsTracker = ({ enabled }: { enabled: boolean }) => {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;
    if (posthog && typeof posthog.capture === 'function') {
      // console.debug('[Analytics][$pageview]', { path: location.pathname });
      posthog.capture('$pageview', { path: location.pathname });
    }
  }, [location.pathname, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const handleVisibility = () => {
      const eventName = document.visibilityState === 'visible' ? 'edu_app_focus' : 'edu_app_blur';
      if (posthog && typeof posthog.capture === 'function') {
        // console.debug('[Analytics][visibility]', { eventName });
        posthog.capture(eventName);
        if (document.visibilityState !== 'visible') {
          // Send $pageleave to improve bounce/session duration analytics
          posthog.capture('$pageleave', { path: location.pathname });
          // console.debug('[Analytics][$pageleave]', { path: location.pathname });
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [enabled, location.pathname]);

  return null;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Se não há sessão válida, redireciona
    if (!pb.authStore.isValid) {
      navigate('/auth');
      return; // Sai imediatamente após redirecionar
    }
    setLoading(false);

    // Fica escutando logout externo (ex: expiração de token)
    const unsubscribe = pb.authStore.onChange(() => {
      if (!pb.authStore.isValid) {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, []); // Remove navigate das dependências para evitar loop infinito

  if (loading) return null; // ou um spinner

  return children;
};

// Component that chooses between mobile and desktop home
const HomeWithMobileSupport = () => {
  const { isMobile, isTablet } = useMobileDetection();

  if (isMobile || isTablet) {
    return <MobileHome />;
  }

  return <Home />;
};
