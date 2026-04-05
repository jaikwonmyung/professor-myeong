const fs = require('fs');
const path = require('path');

const srcDir = '/Users/spicymama/Desktop/ASCII CODE';
const destDir = path.join(__dirname, 'assets', 'images');

// Mapping Korean titles to Cool Brutalist English Titles
const nameMap = {
    '25.11.07 강남역삼갤러리 전시 좌대 제작 ': 'EXHIBIT_PEDESTAL___YEOKSAM_GALLERY',
    '25.12.23 서울시립대학교 빨간벽돌갤러리 전시 기물 제작 및 설치': 'UOS_RED_BRICK___EXHIBITION_FIXTURES',
    '26.03.10 나주문화재단 나현작가 작품 하단 바퀴 제작 철재구조물 보수 시공': 'NAJU_FOUNDATION___STRUCTURAL_REPAIR',
    '공간디자인 오브제3d모델링 및 프린팅': 'SPATIAL___3D_MODELING_PRINTING',
    '금속집기 제작': 'METALLIC_FIXTURE_FABRICATION',
    '미스치프 스토어 입간판 제작': 'MSCHF___STORE_SIGNAGE_FABRICATION',
    '스토어 기물 제작': 'STORE_FIXTURE_DEVELOPMENT',
    '아일랜드 존 제작': 'ISLAND_ZONE_ENGINEERING',
    '아일랜드 테이블 제작': 'ISLAND_TABLE_CONSTRUCTION',
    '야외조형물 제작': 'OUTDOOR_MONUMENT_FABRICATION',
    '오더메터 의자 3d 프린팅': 'ODOMETER_CHAIR___3D_PRINTING',
    '오브제 제작': 'OBJECT_FABRICATION___SERIES_A',
    '오브제 존 제작': 'OBJECT_ZONE___SPATIAL_DESIGN',
    '작가의뢰 실리콘 및 FRP조각 제작': 'COMMISSION___SILICONE_FRP_SCULPTURE',
    '잰틀몬스터 오브제 제작': 'GENTLE_MONSTER___OBJECT_FABRICATION',
    '전시 공간 디자인 및 기물 제작': 'EXHIBITION_SPATIAL_DESIGN_FIXTURES',
    '전시 공간 디자인 및 집기 제작': 'EXHIBITION_SPATIAL_DESIGN_FIXTURES_II',
    '젠틀몬스터 재료 샘플링': 'GENTLE_MONSTER___MATERIAL_SAMPLING'
};

const items = fs.readdirSync(srcDir, { withFileTypes: true });

let projectIndex = [];
let idx = 1;

items.forEach(item => {
    if (item.isDirectory()) {
        const korName = item.name.trim().normalize('NFC');
        // Fallback name if it's not in our map
        const engName = nameMap[korName] || `PROJECT_${idx}`;
        const srcFolder = path.join(srcDir, item.name);
        const destFolder = path.join(destDir, engName);
        
        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder, { recursive: true });
        }
        
        const files = fs.readdirSync(srcFolder);
        const imageFiles = files.filter(f => f.match(/\.(png|jpe?g|gif|webp)$/i));
        
        const copiedImages = [];
        
        imageFiles.forEach(file => {
            const ext = path.extname(file);
            const baseName = path.basename(file, ext).replace(/\s+/g, '_');
            const safeName = baseName + ext;
            const srcFile = path.join(srcFolder, file);
            const destFile = path.join(destFolder, safeName);
            
            fs.copyFileSync(srcFile, destFile);
            copiedImages.push(`assets/images/${engName}/${safeName}`);
        });

        if (copiedImages.length > 0) {
            projectIndex.push({
                id: idx.toString().padStart(2, '0'),
                title: engName.replace(/___/g, ' / ').replace(/_/g, ' '),
                koreanTitle: korName,
                images: copiedImages
            });
            idx++;
        }
    }
});

// Write to JSON so we can use it in HTML generation
fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projectIndex, null, 2));
console.log('Successfully copied images and generated projects.json');
