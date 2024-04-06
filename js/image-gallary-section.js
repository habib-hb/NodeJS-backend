
let parmanentStyles = {};

const galleryImageDivs = document.querySelectorAll('.section-gallary > #galary-img-container > div');

galleryImageDivs.forEach(div => {
    div.addEventListener('mouseover', () => {
        const h2 = div.querySelector('h2');
        if (h2) {
            h2.style.visibility = 'hidden';
        }
        
        // Blur other images
        galleryImageDivs.forEach(otherDiv => {
            if (otherDiv !== div) {
                otherDiv.style.filter = 'blur(2px)';
            }
        });
        
        // Apply dancing animation to the hovered image
        div.style.animation = 'img-up 6s linear infinite';
        div.style.zIndex = '1';

        parmanentStyles.divBorder = div.style.border;
        div.style.border = 'none';
    });

    div.addEventListener('mouseout', () => {
        const h2 = div.querySelector('h2');
        if (h2) {
            h2.style.visibility = 'visible';
        }
        
        // Reset blur on other images
        galleryImageDivs.forEach(otherDiv => {
            if (otherDiv !== div) {
                otherDiv.style.filter = 'none';
            }
        });
        
        // Remove dancing animation from the hovered image
        div.style.animation = 'none';
        div.style.zIndex = '0';

        // Reset border
        div.style.border = parmanentStyles.divBorder;
    });
});