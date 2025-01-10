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
#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")] // Convertit automatiquement les noms des champs en camelCase
struct Wine {
    id: u32,
    name: String,
    appellation: String,
    producer: String,
    color: String,
    vintage: u16,
    purchase_date: String,
    purchase_price: f32,
    bottle_size: u16,
    quantity_bought: u16,
    quantity_left: u16,
    quantity_drunk: u16,
    notes: String,
    wine_type: String,
    peak: u16,
}

fn get_wine_file_path() -> PathBuf {
    if cfg!(debug_assertions) {
        // Mode développement
        let mut path = env::current_dir().expect("Impossible d'obtenir le répertoire courant");
        path.push("wines.json");
        println!("Chemin calculé pour le fichier JSON (dev) : {:?}", path);
        path
    } else {
        // Mode production (AppData sur Windows, ou équivalent)
        let home_dir = dirs::data_dir().expect("Impossible d'obtenir le répertoire utilisateur");
        let mut path = home_dir;
        path.push("livredecave");
        fs::create_dir_all(&path).expect("Impossible de créer le répertoire pour les données");
        path.push("wines.json");
        println!("Chemin calculé pour le fichier JSON (prod) : {:?}", path);
        path
    }
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
fn add_wine(wine: Wine) -> Result<Wine, String> {
    // Charger les vins existants
    let mut wines = match load_wines() {
        Ok(w) => w,
        Err(e) => {
            println!("Erreur lors du chargement des vins : {}", e);
            return Err(e);
        }
    };

    println!("Vins avant ajout : {:?}", wines);

    // Cloner le vin avant de l'ajouter
    let cloned_wine = wine.clone();
    wines.push(wine);

    // Sauvegarder les vins
    if let Err(e) = save_wines(wines) {
        println!("Erreur lors de la sauvegarde des vins : {}", e);
        return Err(e);
    }

    println!("Vin ajouté et sauvegardé avec succès.");
    Ok(cloned_wine)
}

// Commande pour supprimer un vin
#[tauri::command]
fn delete_wine(id: u32) -> Result<(), String> {
    println!("Id du vin a delete : {}", id);
    // Charger les vins existants
    let mut wines = match load_wines() {
        Ok(w) => w,
        Err(e) => {
            println!("Erreur lors du chargement des vins : {}", e);
            return Err(e);
        }
    };

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
