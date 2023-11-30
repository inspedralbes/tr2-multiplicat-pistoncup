export async function getProductes() {
    let response = await fetch("http://localhost:8000/api/preguntes");
    let preguntes = await response.json();
    console.log(preguntes);
    return preguntes;
}