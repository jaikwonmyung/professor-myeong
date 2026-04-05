const fs = require('fs');
const projects = require('./projects.json');

const headerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ASCII CODE | Materializing the Ephemeral</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="top-nav">
        <span>Cargo® Demo Site Clone</span>
        <span>Sample Prvw (Material)</span>
        <span>Demo Index p.(1-21)</span>
        <span>Profile (Sample)</span>
    </div>

    <!-- Hero Title -->
    <header class="hero-title">
        <h1>ASCII CODE</h1>
        <h1>Materializing the Ephemeral</h1>
        <h1>Anti-gravity Atmospheres</h1>
    </header>

    <!-- Manifesto Text Columns -->
    <section class="manifesto-grid">
        <div class="col">
            <p><strong>Brand Manifesto</strong></p>
            <p>We interpret the abstract language of digital logic into tangible spatial narratives. ASCII CODE is a premium object fabrication studio that transcends the boundaries of art, fashion, and structural engineering.</p>
            <p>우리는 디지털 로직의 추상적인 언어를 만질 수 있는 공간적 서사로 치환합니다. 아스키 코드는 예술과 패션, 구조 공학의 경계를 허무는 프리미엄 오브제 제작 스튜디오입니다.</p>
        </div>
        <div class="col">
            <p><strong>Technical Artistry</strong></p>
            <p>Sophisticated Materiality & Chromatic Precision. Our output is defined by an uncompromising commitment to high-end finishing. From hyper-glossy polymers to meticulously brushed surfaces, we curate textures that evoke "Presence".</p>
            <p>정교한 물성과 색채의 정밀도. 고광택 폴리머부터 섬세하게 가공된 텍스처까지, 우리는 '현존감'과 '분위기'를 형성하는 공간을 창조하며 럭셔리 패션 산업의 엄격한 기준을 충족합니다.</p>
        </div>
        <div class="col">
            <p><strong>Spatial Narrative</strong></p>
            <p>Architecting Social Presence. We design objects that are not merely seen, but experienced and shared. Our "Anti-gravity" design language creates surreal moments that captivate the digital generation.</p>
            <p>사회적 현존의 설계. 우리는 단순히 보는 대상을 넘어 공유되는 오브제를 디자인합니다. 아스키 코드만의 초현실적 디자인 언어는 팝업을 바이럴 가능한 문화적 콘텐츠로 변모시킵니다.</p>
        </div>
        <div class="col sidebar-col">
            <div class="side-block">
                <hr>
                <p><strong>Keywords</strong></p>
                <p>Defying the Weight of Reality<br>Structural Suspension & Fluidity<br>The Logic of Aesthetics<br>Sartorial Approach to Object Fabrication</p>
            </div>
            <div class="side-block">
                <hr>
                <p><strong>Contact</strong></p>
                <p>Instagram ↗<br>Email Inquiry ↗</p>
            </div>
        </div>
    </section>
`;

let projectsHtml = '<section class="projects-container">';

// Reverse the projects so 18 is first, down to 1
projects.reverse().forEach((proj, i) => {
    const mainImg = proj.images[0] || '';
    const otherImgs = proj.images.slice(1, 4); // Up to 3 thumbs
    
    let thumbHtml = '';
    if (otherImgs.length > 0) {
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
                    '<p>Project Archive</p>' +
                    '<p>' + proj.title + '</p>' +
                '</div>' +
                '<div class="proj-desc">' +
                    '<p><strong>' + proj.koreanTitle + '</strong></p>' +
                    '<p>Defying physical constraints to create Anti-gravity spaces where the weight of material meets the lightness of imagination.</p>' +
                '</div>' +
                '<div class="proj-sus">' +
                    '<p>Suspension & Fluidity</p>' +
                    '<p>A sartorial approach to object fabrication. Transcending the analog-digital divide.</p>' +
                '</div>' +
            '</div>' +
            '<div class="proj-image-box">' +
                '<div class="crosshair tl"></div>' +
                '<div class="crosshair tr"></div>' +
                '<div class="crosshair bl"></div>' +
                '<div class="crosshair br"></div>' +
                (mainImg ? '<img loading="lazy" src="' + mainImg + '" alt="' + proj.title + '">' : '') +
            '</div>' +
            thumbHtml +
        '</div>' +
        '<div class="proj-right">' +
            '<div class="right-col-item">' +
                '<hr>' +
                '<p><strong>Execution</strong><br>Anti-gravity Fabrication<br>Precision Casting<br>Structural Base</p>' +
            '</div>' +
            '<div class="right-col-item">' +
                '<hr>' +
                '<p><strong>Context</strong><br>Transcending boundaries of art, fashion, and structural engineering.</p>' +
            '</div>' +
        '</div>' +
    '</article>';
});

projectsHtml += '</section>';

const footerHtml = `
    <footer class="site-footer">
        <p>ASCII CODE © 2026. All rights reserved.</p>
        <p>Materializing the Ephemeral.</p>
    </footer>
</body>
</html>
`;

fs.writeFileSync('./index.html', headerHtml + projectsHtml + footerHtml);
console.log('index.html generated successfully.');
