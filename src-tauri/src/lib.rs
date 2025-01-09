use serde::{Deserialize, Serialize};
use std::{env, fs, path::PathBuf};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            load_wines,
            save_wines,
            add_wine,
            delete_wine,
            update_wine,
            create_wine_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Structure Wine poour représenter un vin
#[derive(Serialize, Deserialize, Debug)]
struct Wine {
    id: u32,
    name: String,
    appellation: String,
    producer: String,
    color: String,
    vintage: u16,
    purchaseDate: String,
    purchasePrice: f32,
    bottleSize: u16,
    quantityBought: u16,
    quantityLeft: u16,
    quantityDrunk: u16,
    notes: String,
    wineType: String,
    peak: String,
}

// Chemin absolu vers le fichier JSON
// fn get_wine_file_path() -> PathBuf {
//     let mut path = env::current_dir().expect("Impossible d'obtenir le répertoire courant");
//     path.push("src-tauri");
//     path.push("wines.json");
//     path
// }

fn get_wine_file_path() -> PathBuf {
    let mut path = env::current_dir().expect("Impossible d'obtenir le répertoire courant");
    path.push("src-tauri");
    path.push("wines.json");
    println!("Chemin calculé pour le fichier JSON : {:?}", path);
    path
}

// Commande pour charger les vins
#[tauri::command]
fn load_wines() -> Result<Vec<Wine>, String> {
    let file_path = get_wine_file_path();
    if !fs::metadata(&file_path).is_ok() {
        create_wine_file()
            .map_err(|e| format!("Erreur lors de la création du fichier JSON : {}", e))?;
    }

    let data = fs::read_to_string(file_path)
        .map_err(|e| format!("Erreur de lecture du fichier : {}", e))?;
    let wines: Vec<Wine> =
        serde_json::from_str(&data).map_err(|e| format!("Erreur de parsing JSON : {}", e))?;
    Ok(wines)
}

// Commande pour sauvegarder les vins
#[tauri::command]
fn save_wines(wines: Vec<Wine>) -> Result<(), String> {
    let file_path = get_wine_file_path();
    let data = serde_json::to_string(&wines).map_err(|e| e.to_string())?;
    fs::write(file_path, data).map_err(|e| e.to_string())?;
    Ok(())
}

// Commande pour ajouter un vin
#[tauri::command]
fn add_wine(wine: Wine) -> Result<(), String> {
    println!("Nouveau vin: {:?}", wine);

    // Charger les vins existants
    let mut wines = match load_wines() {
        Ok(w) => w,
        Err(e) => {
            println!("Erreur lors du chargement des vins : {}", e);
            return Err(e);
        }
    };

    println!("Vins avant ajout : {:?}", wines);

    // Ajouter le nouveau vin
    wines.push(wine);

    // Sauvegarder les vins
    if let Err(e) = save_wines(wines) {
        println!("Erreur lors de la sauvegarde des vins : {}", e);
        return Err(e);
    }

    println!("Vin ajouté et sauvegardé avec succès.");
    Ok(())
}

// Commande pour supprimer un vin
#[tauri::command]
fn delete_wine(id: u32) -> Result<(), String> {
    let mut wines = load_wines().unwrap_or_default();
    wines.retain(|wine| wine.id != id);
    save_wines(wines)
}

// Commande pour modifier un vin
#[tauri::command]
fn update_wine(wine: Wine) -> Result<(), String> {
    let mut wines = load_wines().unwrap_or_default();
    if let Some(index) = wines.iter().position(|w| w.id == wine.id) {
        wines[index] = wine;
        save_wines(wines)
    } else {
        Err("Wine not found".to_string())
    }
}

// Commande pour créer le fichier de vins
#[tauri::command]
fn create_wine_file() -> Result<(), String> {
    let file_path = get_wine_file_path();
    let parent_dir = file_path
        .parent()
        .expect("Impossible de déterminer le répertoire parent");

    if !parent_dir.exists() {
        fs::create_dir_all(parent_dir).map_err(|e| e.to_string())?;
    }

    let wines = Vec::<Wine>::new(); // Liste vide de vins
    let data = serde_json::to_string(&wines).map_err(|e| e.to_string())?;
    fs::write(file_path, data).map_err(|e| e.to_string())
}
