
// 1. Khởi tạo trạng thái và thông tin chuyến đi
let currentState = "BOOKED";
let baseFare = 15000;
let pricePerKm = 10000;

function handleStatusChange(newState, distanceKm, reason) {
    console.log(`\n-- Đang chuyển trạng thái từ ${currentState} sang ${newState} --`);
    
    // Sử dụng switch-case để quản lý trạng thái
    switch (currentState) {
        case "BOOKED":
            if (newState === "ACCEPTED") {
                currentState = newState;
                console.log("Thành công: Tài xế đã nhận cuốc.");
            } else if (newState === "CANCELLED") {
                currentState = newState;
                console.log("Khách hủy khi tài xế chưa đến. Phí hủy = 0 VNĐ. Lý do: " + reason);
            } else {
                console.log("Lỗi: Chuyển trạng thái không hợp lệ.");
            }
            break;

        case "ACCEPTED":
            if (newState === "IN_TRANSIT") {
                currentState = newState;
                console.log("Thành công: Tài xế đã đón khách và bắt đầu di chuyển.");
            } else if (newState === "CANCELLED") {
                currentState = newState;
                
                // Logic if-else tính cước ngoại lệ (hủy chuyến muộn)
                if (reason === "thời tiết bão") {
                    console.log("Tài xế hủy do thời tiết bão. Miễn phí hủy = 0 VNĐ.");
                } else {
                    console.log("Hủy cuốc khi tài xế đã nhận. Phí hủy = 10,000 VNĐ. Lý do: " + reason);
                }
            } else {
                console.log("Lỗi: Chuyển trạng thái không hợp lệ.");
            }
            break;

        case "IN_TRANSIT":
            if (newState === "COMPLETED") {
                // Logic if-else xử lý ngoại lệ tính cước phí
                if (distanceKm < 0) {
                    console.log("Ngoại lệ: Khách nhập sai thông tin (khoảng cách < 0).");
                } else if (distanceKm > 200) {
                    console.log("Ngoại lệ: Cuốc xe vượt quá quãng đường tối đa cho phép (200km).");
                } else {
                    currentState = newState;
                    let surcharge = 5000; // phụ phí
                    let discount = 10000; // giảm giá
                    let totalFare = baseFare + (distanceKm * pricePerKm) + surcharge - discount;
                    
                    if (totalFare < 0) totalFare = 0;
                    console.log(`Chuyến đi hoàn tất! Tổng cước phí: ${totalFare} VNĐ (Đã cộng phụ phí và giảm giá).`);
                }
            } else if (newState === "CANCELLED") {
                currentState = newState;
                console.log("Sự cố dọc đường, chuyến đi bị hủy. Lý do: " + reason);
            } else {
                console.log("Lỗi: Chuyển trạng thái không hợp lệ.");
            }
            break;

        case "COMPLETED":
        case "CANCELLED":
            console.log("Chuyến đi đã kết thúc. Không thể thay đổi trạng thái nữa.");
            break;

        default:
            console.log("Trạng thái hiện tại không hợp lệ.");
            break;
    }
}

// ==========================================
// 5. Kịch bản thử nghiệm (Test Scenarios)
// ==========================================

function runTests() {
    console.log("=== Kịch bản 1: Chuyến đi hoàn tất bình thường ===");
    currentState = "BOOKED"; // Đặt lại trạng thái ban đầu
    handleStatusChange("ACCEPTED");
    handleStatusChange("IN_TRANSIT");
    handleStatusChange("COMPLETED", 10); // 10km

    console.log("\n=== Kịch bản 2: Khách hủy sớm (chưa đón) ===");
    currentState = "BOOKED";
    handleStatusChange("CANCELLED", 0, "Khách đổi ý");

    console.log("\n=== Kịch bản 3: Hủy muộn (tài xế đã nhận) ===");
    currentState = "BOOKED";
    handleStatusChange("ACCEPTED");
    handleStatusChange("CANCELLED", 0, "Khách chờ quá lâu");

    console.log("\n=== Kịch bản 4: Ngoại lệ 1 - Khách nhập sai thông tin (khoảng cách âm) ===");
    currentState = "BOOKED";
    handleStatusChange("ACCEPTED");
    handleStatusChange("IN_TRANSIT");
    handleStatusChange("COMPLETED", -5);

    console.log("\n=== Kịch bản 5: Ngoại lệ 2 - Tài xế hủy do thời tiết bão ===");
    currentState = "BOOKED";
    handleStatusChange("ACCEPTED");
    handleStatusChange("CANCELLED", 0, "thời tiết bão");

    console.log("\n=== Kịch bản 6: Ngoại lệ 3 - Cuốc xe vượt quãng đường tối đa ===");
    currentState = "BOOKED";
    handleStatusChange("ACCEPTED");
    handleStatusChange("IN_TRANSIT");
    handleStatusChange("COMPLETED", 300); // 300km (vượt 200km)
}

// Chạy thử nghiệm
runTests();
