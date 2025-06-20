"use client";

export const disablePageScroll = () => {
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
};

export const enablePageScroll = () => {
  document.body.style.overflow = "visible";
  document.body.style.height = "auto";
  document.documentElement.style.overflowX = "hidden";
};

export const scrollToElement = (elementId: string, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  }
};

export const preventDefaultScroll = (event: React.TouchEvent | React.WheelEvent) => {
  // Only prevent default if we're at the top of the page and scrolling up
  // or at the bottom and scrolling down
  const { currentTarget } = event;
  if (
    (currentTarget.scrollTop === 0 && event.type === "wheel" && (event as React.WheelEvent).deltaY < 0) ||
    (currentTarget.scrollHeight - currentTarget.scrollTop === currentTarget.clientHeight &&
      event.type === "wheel" &&
      (event as React.WheelEvent).deltaY > 0)
  ) {
    event.preventDefault();
  }
};
