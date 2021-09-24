export default function numberItens() {
  const list = Object.values(localStorage);
  const filteredProducts = list.filter((product) => JSON.parse(product).isOnCart);
  return filteredProducts.reduce((total, item) => (
    total + JSON.parse(item).quantity), 0);
}
