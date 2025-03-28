import { useEffect, useRef, useState } from "react";
import "./MouseEffect.css"; // Import your CSS

const MouseEffect = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false); // Track click state
  const [isHovering, setIsHovering] = useState(false); // Track hover state

  const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ef865e",
    "#ec805d",
    "#e36e5c",
    "#df685c",
    "#d5585c",
    "#d1525c",
    "#c5415d",
    "#c03b5d",
    "#b22c5e",
    "#ac265e",
    "#9c155f",
    "#950f5f",
    "#830060",
    "#7c0060",
    "#680060",
    "#60005f",
    "#48005f",
    "#3d005e",
  ];

  const circlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Initialize circles on component mount
  useEffect(() => {
    const circleElements = Array.from(document.querySelectorAll(".circle"));
    circlesRef.current = circleElements;

    circleElements.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      // Check if the cursor is over an element with pointer cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const style = getComputedStyle(element);
        setIsHovering(style.cursor === "pointer");
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        // Left mouse button
        setIsClicked(true);
      }
    };

    const handleMouseUp = (e) => {
      if (e.button === 0) {
        // Left mouse button
        setIsClicked(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Animate circles
  useEffect(() => {
    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circlesRef.current.forEach((circle, index) => {
        // Update position using transform
        const scale = isClicked || isHovering ? 1.5 : 1; // Scale up when clicked or hovering
        circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${
          ((circlesRef.current.length - index) / circlesRef.current.length) *
          scale
        })`;

        circle.x = x;
        circle.y = y;

        const nextCircle =
          circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      animationFrameRef.current = requestAnimationFrame(animateCircles);
    };

    animationFrameRef.current = requestAnimationFrame(animateCircles);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [coords, isClicked, isHovering]); // Add isHovering to dependencies

  return (
    <>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className='circle'></div>
      ))}
    </>
  );
};

export default MouseEffect;
