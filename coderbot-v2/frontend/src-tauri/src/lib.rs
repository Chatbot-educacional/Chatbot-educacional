use tauri::Manager;
use std::path::PathBuf;
use tauri_plugin_fs::FsExt;
use std::fs;

#[tauri::command]
fn get_workspace_dir() -> String {
  if let Some(docs_dir) = dirs::document_dir() {
    let workspace_dir = docs_dir.join("coderbot-workspace");
    if let Err(e) = fs::create_dir_all(&workspace_dir) {
      eprintln!("Error creating workspace directory: {}", e);
    }
    workspace_dir.to_string_lossy().to_string()
  } else if let Some(home_dir) = dirs::home_dir() {
    let workspace_dir = home_dir.join("coderbot-workspace");
    if let Err(e) = fs::create_dir_all(&workspace_dir) {
      eprintln!("Error creating workspace directory: {}", e);
    }
    workspace_dir.to_string_lossy().to_string()
  } else {
    ".".to_string() // Fallback to current directory
  }
}

// Example function to demonstrate file system operations
#[tauri::command]
fn create_example_file(content: String) -> Result<String, String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  let example_file_path = workspace_dir.join("example.txt");
  
  match std::fs::write(&example_file_path, content) {
    Ok(_) => Ok(example_file_path.to_string_lossy().to_string()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
fn read_example_file() -> Result<String, String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  let example_file_path = workspace_dir.join("example.txt");
  
  match std::fs::read_to_string(&example_file_path) {
    Ok(content) => Ok(content),
    Err(e) => Err(e.to_string()),
  }
}

// New functions for CodeEditor
#[tauri::command]
fn list_workspace_files() -> Result<Vec<String>, String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  
  match fs::read_dir(&workspace_dir) {
    Ok(entries) => {
      let files: Vec<String> = entries
        .filter_map(|entry| {
          let entry = entry.ok()?;
          if entry.file_type().ok()?.is_file() {
            Some(entry.file_name().to_string_lossy().to_string())
          } else {
            None
          }
        })
        .collect();
      Ok(files)
    },
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
fn read_file(filename: String) -> Result<String, String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  let file_path = workspace_dir.join(filename);
  
  match std::fs::read_to_string(&file_path) {
    Ok(content) => Ok(content),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
fn write_file(filename: String, content: String) -> Result<(), String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  let file_path = workspace_dir.join(filename);
  
  match std::fs::write(&file_path, content) {
    Ok(_) => Ok(()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
fn ensure_dir(dirname: String) -> Result<String, String> {
  let workspace_dir = PathBuf::from(get_workspace_dir());
  let dir_path = workspace_dir.join(dirname);
  
  match fs::create_dir_all(&dir_path) {
    Ok(_) => Ok(dir_path.to_string_lossy().to_string()),
    Err(e) => Err(e.to_string()),
  }
}

#[tauri::command]
fn chat_with_continue(message: String) -> Result<String, String> {
  // TODO: Implementar a integração real com o Continue
  // Por enquanto, apenas retornamos uma resposta simulada
  Ok(format!("Resposta simulada para: {}", message))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      
      // Create and register workspace directory
      let workspace_dir = PathBuf::from(get_workspace_dir());
      fs::create_dir_all(&workspace_dir).unwrap_or_default();
      
      // Register the workspace directory for full access
      let handle = app.handle();
      let fs_scope = handle.fs_scope();
      let _ = fs_scope.allow_directory(&workspace_dir, true);
      
      Ok(())
    })
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_fs::init())
    .invoke_handler(tauri::generate_handler![
      get_workspace_dir,
      create_example_file,
      read_example_file,
      list_workspace_files,
      read_file,
      write_file,
      ensure_dir,
      chat_with_continue
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
