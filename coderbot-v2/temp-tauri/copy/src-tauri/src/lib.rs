// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Manager;
use uuid::Uuid;
use std::str::FromStr;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_new_window(app: tauri::AppHandle, url: Option<String>, title: Option<String>) -> Result<(), String> {
    let title = title.unwrap_or_else(|| "Nova Janela".to_string());
    let window_id = format!("window-{}", Uuid::new_v4());
    
    match url {
        // Abrir URL externa
        Some(external_url) if external_url.starts_with("http") => {
            tauri_plugin_opener::launch(&app, external_url)
                .map_err(|e| format!("Erro ao abrir URL externa: {}", e))?;
            Ok(())
        },
        // Criar nova janela Tauri
        _ => {
            let builder = tauri::WebviewWindowBuilder::new(
                &app, 
                window_id,
                tauri::WebviewUrl::App("index.html".into())
            )
            .title(title)
            .inner_size(800.0, 600.0);

            builder.build()
                .map_err(|e| format!("Erro ao criar janela: {}", e))?;
            
            Ok(())
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_new_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
