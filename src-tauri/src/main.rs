#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;




// use std::process::Command;

// fn toggle_dark_mode() -> std::process::Output {

//   println!("I was invoked from JS!");

//   Command::new("osascript")
//       .arg("-e")
//       .arg("tell application \"System Events\"")
//       .arg("tell appearance preferences")
//       .arg("set dark mode to not dark mode")
//       .arg("end tell")
//       .arg("end tell")
//       .stdout(std::process::Stdio::inherit())
//       .output()
//       .expect("failed to execute process");
// }

#[tauri::command]
fn toggle_dark_mode() {
  println!("toggle_dark_mode was invoked from JS!");

  Command::new("osascript")
        .arg("-e")
        .arg("tell app \"System Events\" to tell appearance preferences to set dark mode to not dark mode")
        .output()
        .expect("failed to start iTunes");
}

#[tauri::command]
fn turn_off_apps() {
  println!("turn_off_apps was invoked from JS!");
  Command::new("osascript")
        .arg("-e")
        .arg("tell application \"Safari\" to if it is running then quit")
        .arg("-e")
        .arg("tell application \"Tidal\" to if it is running then quit")
        .arg("-e")
        .arg("tell application \"Google Chrome Canary\" to if it is running then quit")
        .output()
        .expect("failed to start Safari");
}

// Also in main.rs
fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![toggle_dark_mode, turn_off_apps])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}



