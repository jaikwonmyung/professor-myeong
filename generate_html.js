const fs = require('fs');
const projects = require('./projects.json');

const headerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ASCII CODE OBJET STUDIO</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="top-nav">
        <span>A-to-Z Execution</span>
        <span>Commercial Spaces</span>
        <span>Fabrication Studio</span>
        <span>Project Archive</span>
    </div>

    <!-- Hero Title -->
    <header class="hero-title">
        <h1>ASCII CODE OBJET STUDIO</h1>
    </header>

    <!-- Manifesto Text Columns -->
    <section class="manifesto-grid">
        <div class="col">
            <p><strong>A-to-Z Spatial Solutions</strong></p>
            <p>ASCII CODE OBJET STUDIO is a specialized fabrication firm taking ownership of the entire spatial journey—from foundational conceptualization and precise 3D architectural planning to high-end manufacturing, on-site installation, and final supervision.</p>
            <p>아스키 코드는 상업 공간과 팝업 스토어의 기획, 3D 설계 단계부터 자체 팩토리를 통한 제작, 현장 시공 및 책임 감리까지 모든 과정을 총괄하는 A-to-Z 오브제 제작 전문 스튜디오입니다.</p>
        </div>
        <div class="col">
            <p><strong>Technical Capabilities</strong></p>
            <p>Our operational framework spans across multiple disciplines: intricate metallic fixtures, advanced polymer/FRP casting, and large-scale 3D printed monuments. We materialize brand identity into tangible assets matching rigorous commercial standards.</p>
            <p>우리는 섬세한 금속 집기부터 대형 실리콘/FRP 조각, 3D 프린팅 조형물에 이르기까지 폭넓은 물성을 다룹니다. 클라이언트의 브랜드 아이덴티티를 완벽한 마감의 결과물로 치환하여 상업 공간의 기준을 높입니다.</p>
        </div>
        <div class="col">
            <p><strong>Commercial Environments</strong></p>
            <p>Specializing in flagship stores and high-profile pop-up exhibitions, we engineer offline touchpoints that drive unparalleled user interaction. We do not just build objects; we construct viral spatial experiences.</p>
            <p>플래그십 스토어와 프리미엄 브랜드 팝업 공간을 전문 타겟으로 삼아, 단순한 구조물을 넘어 소비자 참여와 바이럴을 유도하는 압도적인 오프라인 공간 경험을 건축적으로 설계하고 구축합니다.</p>
        </div>
        <div class="col sidebar-col">
            <div class="side-block">
                <hr>
                <p><strong>Capabilities</strong></p>
                <p>Spatial Conceptualization</p>
                <p>3D Architectural Modeling</p>
                <p>Material Engineering</p>
                <p>Fabrication & Supervision</p>
            </div>
            <div class="side-block">
                <hr>
                <p><strong>Contact</strong></p>
                <p><a href="#" style="color:inherit; text-decoration:none;">Instagram ↗</a></p>
                <p><a href="#" style="color:inherit; text-decoration:none;">Email Inquiry ↗</a></p>
            </div>
        </div>
    </section>
`;

let projectsHtml = '<section class="projects-container">';

projects.reverse().forEach((proj, i) => {
    const mainImg = proj.images[0] || '';
    const otherImgs = proj.images; // Use all images for thumbnails
    
    let thumbHtml = '';
    if (otherImgs.length > 1) { // Show thumbs if there is more than 1 image
        thumbHtml = '<div class="thumb-row">';
        otherImgs.forEach(img => {
            thumbHtml += '<div class="thumb" style="background-image: url(\'' + img + '\')"></div>';
        });
        thumbHtml += '</div>';
    }

    projectsHtml += '<article class="project-row">' +
        '<div class="proj-number">' +
            '<span>' + (projects.length - i) + '</span>' +
        '</div>' +
        '<div class="proj-center">' +
            '<div class="proj-text-row">' +
                '<div class="proj-meta">' +
                    '<p><strong>ASCII CODE</strong></p>' +
                    '<p>Commercial Space Archive</p>' +
                    '<p>' + proj.title + '</p>' +
                '</div>' +
                '<div class="proj-desc">' +
                    '<p><strong>' + proj.koreanTitle + '</strong></p>' +
                    '<p>Providing structural integrity and meticulous design execution for spatial branding.</p>' +
                '</div>' +
                '<div class="proj-sus">' +
                    '<p>Execution & Supervision</p>' +
                    '<p>A-to-Z fabrication processes converting blueprints into physical touchpoints.</p>' +
                '</div>' +
            '</div>' +
            '<div class="proj-image-box">' +
                (mainImg ? '<img loading="lazy" src="' + mainImg + '" alt="' + proj.title + '">' : '') +
            '</div>' +
            thumbHtml +
        '</div>' +
        '<div class="proj-right">' +
            '<div class="right-col-item">' +
                '<hr>' +
                '<p><strong>Phase</strong><br>Conceptualization<br>Fabrication<br>Installation Setup</p>' +
            '</div>' +
            '<div class="right-col-item">' +
                '<hr>' +
                '<p><strong>Context</strong><br>Flagship / Pop-up Operation.</p>' +
            '</div>' +
        '</div>' +
    '</article>';
});

projectsHtml += '</section>';

const footerHtml = `
    <footer class="site-footer">
        <p>ASCII CODE OBJET STUDIO © 2026. All rights reserved.</p>
    </footer>

    <!-- Interactive JS for Image Swapping -->
    <script>
        document.querySelectorAll('.thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Extract URL from inline background-image
                const bgStyle = this.style.backgroundImage;
                const urlMatch = bgStyle.match(/url\\(["']?(.*?)["']?\\)/);
                if (urlMatch && urlMatch[1]) {
                    const newSrc = urlMatch[1];
                    const centerBox = this.closest('.proj-center');
                    const mainImg = centerBox.querySelector('.proj-image-box img');
                    
                    if (mainImg.src.endsWith(newSrc)) return; // Don't swap if same
                    
                    // Fade out
                    mainImg.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainImg.src = newSrc;
                        // Fade in after the image loads
                        mainImg.onload = () => {
                            mainImg.style.opacity = '1';
                        };
                    }, 300); // Wait for CSS transition timing
                }
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('./index.html', headerHtml + projectsHtml + footerHtml);
console.log('index.html with interactive JS generated successfully.');
