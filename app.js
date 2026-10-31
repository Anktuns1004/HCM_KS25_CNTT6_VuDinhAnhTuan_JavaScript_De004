let products = [
  {
    productCode: "PRD-001",productName: "Điện Thoại Nova X1",
    brand: "Nova Mobile",
    stockQuantity: 120,warrantyMonths: 12
  },
  {
    productCode: "PRD-002",productName: "Máy Tính Bảng Nova Tab",
    brand: "Nova Mobile",
    stockQuantity: 35,warrantyMonths: 24
  },
  {
    productCode: "PRD-003",productName: "Tai Nghe Sky Buds",
    brand: "Bluesky Audio",
    stockQuantity: 80,warrantyMonths: 6
  }
];

function normalizeText(rawText) {
  if (!rawText) {
    return "";
  }
  let trimmed = rawText.trim();
  if (trimmed === "") {
    return "";
  }
  let words = trimmed.split(" ");
  let capitalizedWords = words.map(function(word) {
    if (word === "") {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

function findProductIndex(code) {
  if (!code) {
    return -1;
  }
  let targetCode = code.trim().toUpperCase();
  for (let i = 0; i < products.length; i++) {
    if (products[i].productCode === targetCode) {
      return i;
    }
  }
  return -1;
}

function validateProductCode(code){
  if (code === null){
    return "Hủy thao tác";
  }
  if (code.trim() === ""){
    return "Lỗi: Chưa nhập mã sản phẩm";
  }
  let upperCode = code.trim().toUpperCase();
  if (upperCode.length < 6){
    return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
  }
  if (!upperCode.startsWith("PRD-")){
    return "Lỗi: Sai tiền tố (PRD)";
  }
  for (let i = 0; i < upperCode.length; i++){
    if (upperCode.charAt(i) === " ") {
      return "Lỗi: Chứa khoảng trắng";
    }
  }
  if (findProductIndex(upperCode) !== -1){
    return "Lỗi: Mã sản phẩm đã tồn tại";
  }
  return "";
}

function inputIntegerInRange(message, min, max){
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed === "") {
      continue;
    }
    let num = Number(trimmed);
    if (Number.isInteger(num) && num >= min && num <= max){
      return num;
    }
  }
}
function displayProducts(list){
  if (!list || list.length === 0) {
    console.log("Danh sách sản phẩm trống");
    return;
  }
  for (let i = 0; i < list.length; i++){
    let item = list[i];
    console.log(
      (i + 1)+"."+item.productCode +"-"+item.productName+"-" +item.brand +"Số lượng tồn kho:"+item.stockQuantity+"|Số tháng bảo hành:"+item.warrantyMonths
    );
  }
  console.log("Tổng: " + list.length + " sản phẩm");
}
function handleDisplayProducts(){
  displayProducts(products);
}
function handleAddProduct(){
  let rawCode = prompt("Nhập mã sản phẩm mới:");
  if (rawCode === null){
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  let codeError = validateProductCode(rawCode);
  if (codeError !== ""){
    alert(codeError);
    return;
  }
  let productCode = rawCode.trim().toUpperCase();
  let rawName = prompt("Nhập tên sản phẩm:");
  if (rawName === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  let productName = normalizeText(rawName);
  while (productName === ""){
    let retryName = prompt("Tên sản phẩm không được để trống. Nhập lại tên sản phẩm:");
    if (retryName === null) {
      console.log("Đã hủy thao tác thêm.");
      return;
    }
    productName = normalizeText(retryName);
  }
  let rawBrand = prompt("Nhập hãng sản xuất:");
  if (rawBrand === null) {
    console.log("Đã hủy thao tác thêm.");
    return;
  }
  let brand = normalizeText(rawBrand);
  while (brand === "") {
    let retryBrand = prompt("Hãng sản xuất không được để trống. Nhập lại hãng sản xuất:");
    if (retryBrand === null) {
      console.log("Đã hủy thao tác thêm.");
      return;
    }
    brand = normalizeText(retryBrand);
  }

  let stockQuantity =inputIntegerInRange("Nhập số lượng tồn kho (0 - 500):");
  if (stockQuantity === null){
    console.log("Đã hủy thao tác thêm.");
    return;
  }

  let warrantyMonths =inputIntegerInRange("Nhập số tháng bảo hành (6 - 36):");
  if (warrantyMonths === null){
    console.log("Đã hủy thao tác thêm.");
    return;
  }

  let newProduct ={
    productCode: productCode,
    productName: productName,
    brand: brand,
    stockQuantity: stockQuantity,
    warrantyMonths: warrantyMonths
  };
  products.push(newProduct);
  console.log("Thêm sản phẩm thành công!");
  console.log("Mã sản phẩm:"+newProduct.productCode);
  console.log("Tên sản phẩm:"+newProduct.productName);
  console.log("Hãng sản xuất:"+newProduct.brand);
  console.log("Số lượng tồn kho:"+newProduct.stockQuantity);
  console.log("Số tháng bảo hành:"+newProduct.warrantyMonths);
}
function handleUpdateProduct(){
  let rawCode=prompt("Nhập mã sản phẩm cần cập nhật:");
  if (rawCode === null){
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let index = findProductIndex(code);
  if (index === -1){
    console.log("Không tìm thấy sản phẩm có mã"+ code);
    return;
  }
  let currentItem = products[index];
  let oldStock = currentItem.stockQuantity;
  let oldWarranty = currentItem.warrantyMonths;
  let rawStock = prompt("Nhập số lượng tồn kho mới (0 - 500):", currentItem.stockQuantity);
  let stockQuantity = currentItem.stockQuantity;
  if (rawStock !== null && rawStock.trim() !== ""){
    let num = Number(rawStock.trim());
    if (Number.isInteger(num) && num >= 0 && num <= 500){
      stockQuantity = num;
    }
  }
  let rawWarranty = prompt("Nhập số tháng bảo hành mới (6 - 36):", currentItem.warrantyMonths);
  let warrantyMonths = currentItem.warrantyMonths;
  if (rawWarranty !== null && rawWarranty.trim() !== ""){
    let num = Number(rawWarranty.trim());
    if (Number.isInteger(num) && num >= 6 && num <= 36){
      warrantyMonths = num;
    }
  }
  currentItem.stockQuantity =stockQuantity;
  currentItem.warrantyMonths =warrantyMonths;

  console.log("Cập nhật thành công");
  console.log("Số lượng tồn kho trước/sau:"+oldStock +"/"+currentItem.stockQuantity);
  console.log("Số tháng bảo hành trước/sau:"+oldWarranty +"/"+currentItem.warrantyMonths);
}
function handleDeleteProduct(){
  let rawCode = prompt("Nhập mã sản phẩm cần xóa:");
  if (rawCode === null) {
    console.log("Đã hủy thao tác xóa, còn " + products.length + " sản phẩm");
    return;
  }
  let code = rawCode.trim().toUpperCase();
  let index = findProductIndex(code);
  if (index === -1) {
    console.log("Không tìm thấy sản phẩm có mã"+code);
    return;
  }
  let confirmDelete = prompt("Xác nhận xóa sản phẩm " + code + "? Nhập 'Y' hoặc 'y' để đồng ý:");
  if (confirmDelete === null||(confirmDelete.trim()!=="Y"&&confirmDelete.trim()!== "y")){
    console.log("Đã hủy thao tác xóa,còn"+products.length +"sản phẩm");
    return;
  }
  products.splice(index, 1);
  console.log("Xóa thành công,còn"+products.length+"sản phẩm");
}
function handleSearchProduct() {
  let rawKey = prompt("Nhập từ khóa tìm kiếm hãng sản xuất:");
  if (rawKey === null||rawKey.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  let keyword = rawKey.trim().toLowerCase();
  let matchedList = [];
  for (let i = 0; i < products.length; i++){
    let brandLower = products[i].brand.toLowerCase();
    if (brandLower.includes(keyword)) {
      matchedList.push(products[i]);
    }
  }

  if (matchedList.length === 0) {
    console.log("Không tìm thấy sản phẩm phù hợp");
    return;
  }

  let codes = [];
  for (let i = 0; i < matchedList.length; i++){
    codes.push(matchedList[i].productCode);
  }
  console.log("Số kết quả:"+ matchedList.length);
  console.log("Mã sản phẩm tìm thấy:"+codes.join(", "));
}
function displayMenu(){
  console.log("=====================================================");
  console.log("     HỆ THỐNG QUẢN LÝ SẢN PHẨM TECHZONE              ");
  console.log("=====================================================");
  console.log("1. Hiển thị danh sách sản phẩm");
  console.log("2. Thêm sản phẩm mới");
  console.log("3. Cập nhật thông tin sản phẩm");
  console.log("4. Xóa sản phẩm");
  console.log("5. Tìm kiếm sản phẩm theo hãng sản xuất");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");
}
function main() {
  let run = true;
  do {
    displayMenu();
    let rawChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
    if (rawChoice === null) {
      console.log("Cảm ơn bạn đã sử dụng hệ thống TechZone. Tạm biệt!");
      break;
    }
    let trimmedChoice = rawChoice.trim();
    if (trimmedChoice === "") {
      console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
      continue;
    }
    let choice = Number(trimmedChoice);
    if (!Number.isInteger(choice)) {
      console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
      continue;
    }
    switch (choice) {
      case 1:
        handleDisplayProducts();
        break;
      case 2:
        handleAddProduct();
        break;
      case 3:
        handleUpdateProduct();
        break;
      case 4:
        handleDeleteProduct();
        break;
      case 5:
        handleSearchProduct();
        break;
      case 0:
        console.log("Cảm ơn bạn đã sử dụng hệ thống TechZone.");
        run = false;
        break;
      default:
        console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        break;
    }
  } while (run);
}
main();