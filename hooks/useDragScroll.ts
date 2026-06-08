import { useEffect } from "react";

export default function useDragScroll(
  ref: React.RefObject<HTMLDivElement | null>,
  dependency: any[] = []
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let moved = false;

    let velocity = 0;
    let lastX = 0;
    let lastTime = Date.now();
    let animationFrameId: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      moved = false;
      velocity = 0;
      lastX = e.pageX;
      lastTime = Date.now();

      cancelAnimationFrame(animationFrameId);

      // Tắt scroll-behavior và scroll-snap tạm thời để việc kéo bám sát chuột và mượt mà
      el.classList.remove("scroll-smooth");
      el.style.scrollBehavior = "auto";
      el.style.scrollSnapType = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.0; // Đặt tỉ lệ 1.0 cho cảm giác thật tay và mượt mà nhất
      if (Math.abs(walk) > 5) {
        moved = true;
      }

      // Tính vận tốc tức thời (px/ms)
      const now = Date.now();
      const elapsed = now - lastTime;
      if (elapsed > 0) {
        const deltaX = e.pageX - lastX;
        velocity = deltaX / elapsed;
      }

      lastX = e.pageX;
      lastTime = now;

      el.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;

      // Bắt đầu hiệu ứng quán tính (inertia) nếu người dùng kéo mạnh rồi thả ra
      if (moved && Math.abs(velocity) > 0.15) {
        let momentum = velocity * 18; // Hệ số nhân khoảng cách quán tính
        const step = () => {
          el.scrollLeft -= momentum;
          momentum *= 0.92; // Ma sát làm giảm dần vận tốc (friction)
          if (Math.abs(momentum) > 0.5) {
            animationFrameId = requestAnimationFrame(step);
          } else {
            // Khi dừng hẳn, khôi phục lại snap point mặc định và scroll mượt
            el.classList.add("scroll-smooth");
            el.style.scrollBehavior = "";
            el.style.scrollSnapType = "";
          }
        };
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Kéo nhẹ/không có quán tính: khôi phục snap ngay
        el.classList.add("scroll-smooth");
        el.style.scrollBehavior = "";
        el.style.scrollSnapType = "";
      }
    };

    const handleMouseLeave = () => {
      if (!isDown) return;
      handleMouseUp();
    };

    // Ngăn chặn sự kiện drag mặc định của trình duyệt đối với hình ảnh/liên kết bên trong
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Ngăn click vào link bên trong khi đang kéo (event delegation ở capture phase)
    const handleContainerClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Tự động căn chỉnh lại scrollLeft khi cuộn chạm ranh giới Bộ 1 hoặc Bộ 3
    const handleScroll = () => {
      const children = el.children;
      const listData = dependency[0];
      const totalItems = Array.isArray(listData) ? listData.length : 0;
      if (totalItems <= 0 || children.length < totalItems * 3) return;

      const item1 = children[0] as HTMLElement;
      const item2 = children[totalItems] as HTMLElement;
      if (!item1 || !item2) return;

      const oneSetWidth = item2.offsetLeft - item1.offsetLeft;
      if (oneSetWidth <= 0) return;

      const currentScroll = el.scrollLeft;

      // Nếu cuộn qua 2 bộ (lấn sang bộ thứ 3 quá nhiều)
      if (currentScroll >= oneSetWidth * 2) {
        el.classList.remove("scroll-smooth");
        el.style.scrollBehavior = "auto";
        el.scrollLeft = currentScroll - oneSetWidth;
        // Khôi phục lại sau khi nhảy
        setTimeout(() => {
          if (!isDown) {
            el.classList.add("scroll-smooth");
            el.style.scrollBehavior = "";
          }
        }, 50);
      }
      // Nếu cuộn lùi về bộ thứ 1
      else if (currentScroll <= oneSetWidth * 0.5) {
        el.classList.remove("scroll-smooth");
        el.style.scrollBehavior = "auto";
        el.scrollLeft = currentScroll + oneSetWidth;
        setTimeout(() => {
          if (!isDown) {
            el.classList.add("scroll-smooth");
            el.style.scrollBehavior = "";
          }
        }, 50);
      }
    };

    // Thiết lập vị trí ban đầu nằm ở Bộ thứ 2 (chính giữa) sau một khoảng trễ ngắn để DOM render xong
    const initTimeout = setTimeout(() => {
      const children = el.children;
      const listData = dependency[0];
      const totalItems = Array.isArray(listData) ? listData.length : 0;
      if (totalItems > 0 && children.length >= totalItems * 3) {
        const item1 = children[0] as HTMLElement;
        const item2 = children[totalItems] as HTMLElement;
        if (item1 && item2) {
          const oneSetWidth = item2.offsetLeft - item1.offsetLeft;
          if (oneSetWidth > 0) {
            el.classList.remove("scroll-smooth");
            el.style.scrollBehavior = "auto";
            el.scrollLeft = oneSetWidth;
            setTimeout(() => {
              el.classList.add("scroll-smooth");
              el.style.scrollBehavior = "";
            }, 50);
          }
        }
      }
    }, 150);

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("click", handleContainerClick, true);
    el.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(initTimeout);
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("dragstart", handleDragStart);
      el.removeEventListener("click", handleContainerClick, true);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [ref, ...dependency]);
}
