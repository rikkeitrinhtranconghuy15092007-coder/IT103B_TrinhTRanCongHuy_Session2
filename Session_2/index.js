let state = "BOOKED";
let distance = 10;
let pricePerKm = 10000;

function updateState(newState, reason) {
    console.log("\n-> Chuyển từ " + state + " sang " + newState);

    switch (state) {
        case "BOOKED":
            if (newState === "ACCEPTED") {
                state = newState;
                console.log("Tài xế đã nhận cuốc.");
            } else if (newState === "CANCELLED") {
                state = newState;
                console.log("Khách hủy sớm, phí: 0 VNĐ.");
            }
            break;

        case "ACCEPTED":
            if (newState === "IN_TRANSIT") {
                state = newState;
                console.log("Tài xế đang chở khách.");
            } else if (newState === "CANCELLED") {
                state = newState;
                if (reason === "Bão") {
                    console.log("Tài xế hủy do bão, phí: 0 VNĐ.");
                } else {
                    console.log("Khách hủy muộn, phí: 10000 VNĐ.");
                }
            }
            break;

        case "IN_TRANSIT":
            if (newState === "COMPLETED") {
                if (distance < 0 || distance > 200) {
                    console.log("Lỗi: Khoảng cách không hợp lệ!");
                } else {
                    state = newState;
                    let total = distance * pricePerKm;
                    console.log("Hoàn thành! Thu tiền: " + total + " VNĐ.");
                }
            }
            break;
    }
}


console.log("=== Test 1: Chuyến đi bình thường ===");
state = "BOOKED";
updateState("ACCEPTED");
updateState("IN_TRANSIT");
updateState("COMPLETED");

console.log("=== Test 2: Hủy sớm ===");
state = "BOOKED";
updateState("CANCELLED");

console.log("=== Test 3: Hủy do bão ===");
state = "BOOKED";
updateState("ACCEPTED");
updateState("CANCELLED", "Bão");

console.log("=== Test 4: Lỗi khoảng cách ===");
state = "BOOKED";
distance = 500;
updateState("ACCEPTED");
updateState("IN_TRANSIT");
updateState("COMPLETED");
