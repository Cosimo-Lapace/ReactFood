export const url = "http://localhost:3000/";

export async function getMeal(uri) {
  const res = await fetch(url + uri);
  const resData = await res.json();
  if (!res.ok) {
    throw new Error("Fetched wrong");
  }
  return resData;
}

export async function setOrder(uri, order) {
  console.log(order);
  const res = await fetch(url + uri, {
    method: "POST",
    body: JSON.stringify( {order: order} ),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error("Fetched wrong");
  }
  return resData;
}
