#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{Menu, MenuItem, Submenu};
use std::process::Command;

#[tauri::command]
fn toggle_dark_mode() {
  // println!("toggle_dark_mode was invoked from JS!");

  Command::new("osascript")
        .arg("-e")
        .arg("tell app \"System Events\" to tell appearance preferences to set dark mode to not dark mode")
        .output()
        .expect("failed to start iTunes");
}

#[tauri::command]
fn turn_off_apps() {
  // println!("turn_off_apps was invoked from JS!");
  Command::new("osascript")
        .arg("-e")
        .arg("tell application \"Safari\" to if it is running then quit")
        .arg("-e")
        .arg("tell application \"Tidal\" to if it is running then quit")
        .arg("-e")
        .arg("tell application \"Google Chrome Canary\" to if it is running then quit")
        .output()
        .expect("failed to quit Apps");
}

#[tauri::command]
fn turn_on_apps() {
  // println!("turn_on_apps was invoked from JS!");
  Command::new("osascript")
        .arg("-e")
        .arg("tell application \"Safari\" to activate")
        .arg("-e")
        .arg("tell application \"Tidal\" to activate")
        .arg("-e")
        .arg("tell application \"Google Chrome Canary\" to activate")
        .output()
        .expect("failed to start Safari");
}

#[tauri::command]
fn toggle_tidal() {
  // println!("turn_on_apps was invoked from JS!");
  Command::new("osascript")
        .arg("-e")
        .arg("tell application \"Safari\" to activate")
        .arg("-e")
        .arg("tell application \"Tidal\" to activate")
        .arg("-e")
        .arg("tell application \"Google Chrome Canary\" to activate")
        .output()
        .expect("failed to start Safari");
}




// // Also in main.rs
fn main() {
  let menu = Menu::new()
      .add_submenu(Submenu::new("appname", 
        Menu::new()
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::Separator)
        .add_native_item(MenuItem::Quit)
        ));

  // Minimize
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![toggle_dark_mode, turn_off_apps, turn_on_apps, toggle_tidal])
    .menu(menu)
    .run(tauri::generate_context!())
    .expect("failed to run app");


}


