const url = "http://localhost:3000/";

export async function get(uri) {
  const res = await fetch(url + uri);
  const resData = await res.json();
  if(!res.ok){
    throw new Error("Fetched wrong")
  }
  return resData;
}
