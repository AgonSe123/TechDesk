document.addEventListener('DOMContentLoaded', () => {
    // ==================== SCROLL ANIMATIONS ====================
    const animatedElements = document.querySelectorAll('.hidden');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ==================== BUTTON HOVER EFFECTS ====================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        /* button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        }); */
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });

    // ==================== TYPEWRITER EFFECT ====================
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    if (typedTextSpan && cursorSpan) {
        const textArray = [
            "where AI meets human care",
            "your 24/7 support team",
            "redefining customer experience",
            "smarter conversations",
            "instant resolutions",
            "the support solution that learns"
        ];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1500;
        let textArrayIndex = 0;
        let charIndex = 0;
        let isTyping = false;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains("typing")) {
                    cursorSpan.classList.add("typing");
                }
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay + 500);
            }
        }
        
        const typewriterContainer = document.querySelector('.typewriter-container');
        if (typewriterContainer) {
            const typewriterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isTyping) {
                        isTyping = true;
                        setTimeout(type, newTextDelay + 250);
                        typewriterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            typewriterObserver.observe(typewriterContainer);
        }
    }

    // ==================== IMPROVED BUTTON PULSE ANIMATION ====================
    const primaryButtons = document.querySelectorAll('.btn.primary');
    primaryButtons.forEach(button => {
        button.addEventListener('animationiteration', () => {
            button.style.boxShadow = '0 0 0 rgba(0, 81, 255, 0)';
            setTimeout(() => {
                button.style.boxShadow = '0 0 15px rgba(0, 81, 255, 0.7)';
            }, 50);
        });
    });
});