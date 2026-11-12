use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};

// Le indicamos a Rust que usaremos las herramientas del navegador web
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Modificamos la función para que sea asíncrona (async)
#[wasm_bindgen]
pub async fn obtener_portafolio() -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    // Rust hace la petición al archivo JSON local que está en tu frontend
    let request = Request::new_with_str_and_init("./proyectos.json", &opts)?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    let resp: Response = resp_value.dyn_into().unwrap();

    // Convertimos la respuesta JSON directamente a un objeto de JavaScript para Vue
    let json = JsFuture::from(resp.json()?).await?;

    Ok(json)
}
