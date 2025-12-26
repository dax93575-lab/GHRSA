/**
 * Plant Details Manager
 * Handles dynamic content loading based on URL parameters.
 */

// Plant Data Dictionary
const plantsData = {
    // ================== DESERT PLANTS ==================
    "الألوفيرا": {
        latin: "Aloe vera",
        image: "images/desert_الألوفيرا.png",
        description: "الألوفيرا نبات صحراوي معروف في ليبيا والعالم، يُستخدم للزينة وللاستخدامات الطبية والتجميلية. يتميز بأوراقه اللحمية وقدرته العالية على تحمل الحرارة وقلة الري، مما يجعله مثاليًا للبيوت والحدائق الجافة.",
        sun: 70, sunText: "متوسطة", sunNote: "شمس صباحية أو غير مباشرة",
        water: 25, waterText: "قليلة", waterNote: "الري عند جفاف التربة",
        soil: 80, soilText: "رملية", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "كل 3 أشهر",
        category: "desert",
        shortDesc: "نبات عصاري طبي يتحمل الجفاف وسهل العناية."
    },
    "الصبار الذهبي": {
        latin: "Echinocactus grusonii",
        image: "images/desert_الصبار_الذهبي.png",
        description: "من أشهر نباتات الزينة الصحراوية، يتميز بشكله الكروي وأشواكه الذهبية، ولا يحتاج إلى عناية كبيرة.",
        sun: 90, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 15, waterText: "قليلة جدًا", waterNote: "ري نادر",
        soil: 85, soilText: "رملية", soilNote: "تصريف ممتاز",
        fert: 20, fertText: "خفيف", fertNote: "موسم النمو فقط",
        category: "desert",
        shortDesc: "صبار كروي مزخرف شديد التحمل."
    },
    "التين الشوكي": {
        latin: "Opuntia ficus-indica",
        image: "images/desert_التين_الشوكي.png",
        description: "نبات منتشر في ليبيا، يُزرع للأكل والزينة، ويتحمل الجفاف والحرارة العالية.",
        sun: 90, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 20, waterText: "قليلة", waterNote: "يتحمل العطش",
        soil: 75, soilText: "رملية", soilNote: "فقيرة لا مشكلة",
        fert: 25, fertText: "خفيف", fertNote: "مرة سنويًا"
    },
    "أغاف الصحراء": {
        latin: "Agave americana",
        image: "images/desert_أغاف_الصحراء.png",
        description: "نبات معمّر يستخدم في الحدائق الخارجية، معروف بقدرته العالية على تحمل الشمس والجفاف.",
        sun: 95, sunText: "قوية جدًا", sunNote: "يتحمل الشمس الحارقة",
        water: 20, waterText: "قليلة", waterNote: "ري متباعد",
        soil: 85, soilText: "رملية", soilNote: "تصريف عالٍ",
        fert: 15, fertText: "خفيف", fertNote: "غير ضروري غالبًا"
    },
    "الصبار العمودي": {
        latin: "Cereus peruvianus",
        image: "images/desert_الصبار_العمودي.png",
        description: "نبات زخرفي شائع في الحدائق الحديثة، يتميز بسهولة العناية والتحمل العالي.",
        sun: 85, sunText: "قوية", sunNote: "ضوء مباشر",
        water: 20, waterText: "قليلة", waterNote: "ري متباعد",
        soil: 85, soilText: "رملية", soilNote: "خفيفة",
        fert: 25, fertText: "خفيف", fertNote: "موسم النمو"
    },
    "اليوفوربيا": {
        latin: "Euphorbia tirucalli",
        image: "images/desert_اليوفوربيا.png",
        description: "يُستخدم كنبات زينة أو كسياج طبيعي، ويتحمل الظروف القاسية.",
        sun: 85, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 20, waterText: "قليلة", note: "دون إفراط",
        soil: 80, soilText: "رملية", soilNote: "جيدة التصريف",
        fert: 20, fertText: "خفيف", fertNote: "نادرًا"
    },

    // ================== INDOOR PLANTS ==================
    "السانسيفيريا (جلد النمر)": {
        latin: "Sansevieria trifasciata",
        image: "images/home_السانسيفيريا.png",
        description: "من أكثر النباتات المنزلية مبيعًا، يتحمل الإضاءة الضعيفة وقلة الري، ومناسب للمبتدئين.",
        sun: 40, sunText: "ضعيفة", sunNote: "يتحمل الظل",
        water: 20, waterText: "قليلة", waterNote: "ري متباعد",
        soil: 70, soilText: "خفيفة", soilNote: "تصريف جيد",
        fert: 20, fertText: "خفيف", fertNote: "كل 3 أشهر"
    },
    "البوتس": {
        latin: "Epipremnum aureum",
        image: "images/home_البوتس.png",
        description: "نبات شائع جدًا في البيوت والمكاتب، سهل العناية وسريع الانتشار.",
        sun: 50, sunText: "متوسطة", sunNote: "ضوء غير مباشر",
        water: 40, waterText: "متوسطة", waterNote: "عند جفاف السطح",
        soil: 65, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "شهريًا"
    },
    "المونستيرا": {
        latin: "Monstera deliciosa",
        image: "images/home_المونستيرا.png",
        description: "نبات ديكوري شهير بأوراقه الكبيرة المثقوبة، مناسب للمنازل الحديثة.",
        sun: 60, sunText: "متوسطة", sunNote: "ضوء ساطع غير مباشر",
        water: 45, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "غنية", soilNote: "خفيفة",
        fert: 40, fertText: "متوسط", fertNote: "موسم النمو"
    },
    "الفيكس بنجامينا": {
        latin: "Ficus benjamina",
        image: "images/home_الفيكس_بنجامينا.png",
        description: "نبات منزلي شائع يضفي لمسة خضراء جميلة للمساحات الداخلية.",
        sun: 60, sunText: "متوسطة", sunNote: "ضوء غير مباشر",
        water: 45, waterText: "متوسطة", waterNote: "دون إفراط",
        soil: 70, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 35, fertText: "متوسط", fertNote: "كل شهرين"
    },
    "زاميا": {
        latin: "Zamioculcas zamiifolia",
        image: "images/home_zamia.png",
        description: "مناسب للمكاتب والبيوت، يتحمل الإضاءة الضعيفة وقلة الري.",
        sun: 35, sunText: "ضعيفة", sunNote: "ظل جزئي",
        water: 20, waterText: "قليلة", waterNote: "ري متباعد",
        soil: 65, soilText: "خفيفة", soilNote: "جيدة التصريف",
        fert: 20, fertText: "خفيف", fertNote: "نادرًا",
        category: "indoor",
        shortDesc: "نبات منزلي فاخر شديد التحمل."
    },
    "الفيكس المطاطي": {
        latin: "Ficus elastica",
        image: "images/home_rubber_plant.png",
        description: "نبات قوي وسهل العناية، يضيف مظهرًا أنيقًا للمكان.",
        sun: 55, sunText: "متوسطة", sunNote: "ضوء غير مباشر",
        water: 40, waterText: "متوسطة", waterNote: "ري معتدل",
        soil: 70, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 35, fertText: "متوسط", fertNote: "شهريًا",
        category: "indoor",
        shortDesc: "نبات منزلي بأوراق عريضة لامعة."
    },

    // ================== MEDICINAL PLANTS ==================
    "النعناع": {
        latin: "Mentha",
        image: "images/medical_النعناع.png",
        description: "النعناع من أشهر النباتات الطبية والعطرية في ليبيا، يُستخدم في المشروبات والعلاجات الشعبية. يتميز بسرعة نموه ورائحته القوية، ويمكن زراعته في أصص أو حدائق صغيرة.",
        sun: 60, sunText: "متوسطة", sunNote: "شمس صباحية أو ظل جزئي",
        water: 55, waterText: "متوسطة", waterNote: "تربة رطبة دون إغراق",
        soil: 70, soilText: "غنية", soilNote: "جيدة التصريف",
        fert: 35, fertText: "خفيف", fertNote: "مرة شهريًا"
    },
    "الريحان": {
        latin: "Ocimum basilicum",
        image: "images/medical_الريحان.png",
        description: "الريحان نبات شائع في البيوت الليبية، يتميز برائحته الزكية واستخداماته المتعددة، ويُزرع بسهولة في الأصص.",
        sun: 70, sunText: "متوسطة", sunNote: "ضوء ساطع",
        water: 50, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "غنية", soilNote: "خفيفة",
        fert: 40, fertText: "متوسط", fertNote: "كل أسبوعين"
    },
    "الزعتر": {
        latin: "Thymus vulgaris",
        image: "images/medical_الزعتر.png",
        description: "الزعتر نبات معروف في المطبخ والعلاج الشعبي، يتميز بتحمله للجفاف وسهولة العناية به.",
        sun: 80, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 35, waterText: "قليلة", waterNote: "ري خفيف",
        soil: 75, soilText: "خفيفة", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "كل شهرين"
    },
    "إكليل الجبل": {
        latin: "Rosmarinus officinalis",
        image: "images/medical_إكليل_الجبل.png",
        description: "نبات قوي التحمل، يُستخدم في الطهي والعلاج، ومناسب للحدائق والأصص.",
        sun: 80, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 35, waterText: "قليلة", waterNote: "لا إفراط",
        soil: 75, soilText: "خفيفة", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "نادرًا"
    },
    "البابونج": {
        latin: "Matricaria chamomilla",
        image: "images/medical_البابونج.png",
        description: "يُستخدم البابونج في المشروبات الطبية، ويتميز بأزهاره البيضاء الصغيرة وسهولة زراعته.",
        sun: 65, sunText: "متوسطة", sunNote: "ضوء معتدل",
        water: 45, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "شهريًا"
    },
    "الخزامى (اللافندر)": {
        latin: "Lavandula angustifolia",
        image: "images/medical_الخزامى.png",
        description: "نبات جميل ومفيد، يستخدم للاسترخاء والعطور، ويتحمل الجفاف والحرارة.",
        sun: 85, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 30, waterText: "قليلة", waterNote: "ري خفيف",
        soil: 75, soilText: "خفيفة", soilNote: "رملية",
        fert: 30, fertText: "خفيف", fertNote: "نادرًا"
    },

    // ================== FLOWERING PLANTS ==================
    "الورد البلدي": {
        latin: "Rosa",
        image: "images/flowering_الورد_البلدي.png",
        description: "الورد البلدي من أكثر النباتات المزهرة انتشارًا، يُزرع للزينة ويحتاج إلى عناية متوسطة.",
        sun: 75, sunText: "متوسطة", sunNote: "شمس صباحية",
        water: 50, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 75, soilText: "غنية", soilNote: "جيدة التصريف",
        fert: 45, fertText: "متوسط", fertNote: "أثناء الإزهار"
    },
    "الجوري": {
        latin: "Rosa damascena",
        image: "images/flowering_الجوري.png",
        description: "يتميز الجوري برائحته القوية ويستخدم للزينة والعطور.",
        sun: 75, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 50, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 75, soilText: "غنية", soilNote: "جيدة التصريف",
        fert: 45, fertText: "متوسط", fertNote: "أثناء الإزهار"
    },
    "الياسمين": {
        latin: "Jasminum",
        image: "images/flowering_الياسمين.png",
        description: "الياسمين نبات محبوب في البيوت الليبية، يتميز برائحته القوية وأزهاره البيضاء.",
        sun: 70, sunText: "قوية", sunNote: "ضوء ساطع",
        water: 50, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "غنية", soilNote: "خفيفة",
        fert: 40, fertText: "متوسط", fertNote: "كل أسبوعين"
    },
    "الجهنمية": {
        latin: "Bougainvillea",
        image: "images/flowering_الجهنمية.png",
        description: "مثالية للحدائق والأسوار، تتحمل الحرارة وقلة الماء.",
        sun: 90, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 30, waterText: "قليلة", waterNote: "لا إفراط",
        soil: 70, soilText: "خفيفة", soilNote: "جيدة التصريف",
        fert: 35, fertText: "خفيف", fertNote: "نادرًا"
    },
    "القرنفل": {
        latin: "Dianthus",
        image: "images/flowering_القرنفل.png",
        description: "سهل الزراعة ومناسب للأصص والحدائق.",
        sun: 70, sunText: "متوسطة", sunNote: "ضوء معتدل",
        water: 45, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 40, fertText: "متوسط", fertNote: "شهريًا"
    },
    "الكركديه": {
        latin: "Hibiscus rosa-sinensis",
        image: "images/flowering_الكركديه.png",
        description: "نبات مزهر استوائي كبير الأزهار. نبات زينة جميل، يحتاج إلى شمس وري منتظم.",
        sun: 80, sunText: "قوية", sunNote: "شمس مباشرة",
        water: 55, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 75, soilText: "غنية", soilNote: "جيدة التصريف",
        fert: 45, fertText: "متوسط", fertNote: "أثناء الإزهار"
    },

    // ================== SHADE PLANTS ==================
    "الدراسينا": {
        latin: "Dracaena",
        image: "images/shade_الدراسينا.png",
        description: "نبات ظل أنيق وسهل العناية. مناسب للمنازل والمكاتب، يتحمل الإضاءة الضعيفة.",
        sun: 40, sunText: "ظليلة", sunNote: "ضوء خافت",
        water: 35, waterText: "قليلة", waterNote: "لا إفراط",
        soil: 70, soilText: "خفيفة", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "موسم النمو"
    },
    "نخلة الصالون": {
        latin: "Chamaedorea elegans",
        image: "images/shade_نخلة_الصالون.png",
        description: "نخلة داخلية للظل. نبات جميل يضفي لمسة استوائية داخل المنزل.",
        sun: 35, sunText: "ظليلة", sunNote: "ضوء غير مباشر",
        water: 40, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "عادية", soilNote: "جيدة التصريف",
        fert: 30, fertText: "خفيف", fertNote: "كل شهرين"
    },
    "السرخس": {
        latin: "Boston Fern",
        image: "images/shade_السرخس.png",
        description: "نبات ظل كثيف الأوراق. مناسب للأماكن الرطبة والظل.",
        sun: 30, sunText: "ظليلة", sunNote: "ظل، ضوء خافت",
        water: 55, waterText: "عالية", waterNote: "تربة رطبة دائماً",
        soil: 75, soilText: "رطبة", soilNote: "غنية بالبيتموس",
        fert: 35, fertText: "خفيف", fertNote: "موسم النمو"
    },
    "السانسيفيريا": {
        latin: "Sansevieria trifasciata",
        image: "images/shade_السانسيفيريا.png",
        description: "نبات ظل شديد التحمل. مثالي للأماكن قليلة الإضاءة.",
        sun: 30, sunText: "ضعيفة", sunNote: "يتحمل الظل",
        water: 20, waterText: "قليلة", waterNote: "ري متباعد",
        soil: 65, soilText: "خفيفة", soilNote: "تصريف جيد",
        fert: 20, fertText: "خفيف", fertNote: "كل 3 أشهر"
    },

    // ================== FRUIT TREES ==================
    "الزيتون": {
        latin: "Olea europaea",
        image: "images/fruit_الزيتون.png",
        description: "من أهم الأشجار في ليبيا، تتحمل الجفاف وتنتج ثماراً اقتصادية عالية القيمة.",
        sun: 85, sunText: "كاملة", sunNote: "تحتاج لشمس ساطعة",
        water: 30, waterText: "قليلة", waterNote: "مقاوم ممتاز للجفاف",
        soil: 75, soilText: "صخرية-عادية", soilNote: "تنجح في معظم الأراضي",
        fert: 40, fertText: "قليل", fertNote: "سماد عضوي سنوي"
    },
    "النخيل": {
        latin: "Phoenix dactylifera",
        image: "images/fruit_النخيل.png",
        description: "شجرة قوية تتحمل الحرارة وتنتج التمور.",
        sun: 90, sunText: "حارقة", sunNote: "شمس وحرارة عالية",
        water: 35, waterText: "قليلة", waterNote: "يتحمل العطش",
        soil: 75, soilText: "متنوعة", soilNote: "يتحمل الملوحة",
        fert: 45, fertText: "متوسط", fertNote: "مرة سنويًا"
    },
    "التين": {
        latin: "Ficus carica",
        image: "images/fruit_التين.png",
        description: "منتشرة في ليبيا وتنتج ثماراً لذيذة.",
        sun: 80, sunText: "كاملة", sunNote: "شمس مباشرة",
        water: 40, waterText: "متوسطة", waterNote: "ري عميق متباعد",
        soil: 70, soilText: "عادية", soilNote: "جيدة الصرف والتهوية",
        fert: 40, fertText: "متوسط", fertNote: "مرة في الربيع"
    },
    "الرمان": {
        latin: "Punica granatum",
        image: "images/fruit_الرمان.png",
        description: "شجرة قوية ذات ثمار صحية ومطلوبة.",
        sun: 80, sunText: "حارقة", sunNote: "شمس وحرارة عالية",
        water: 40, waterText: "قليلة", waterNote: "مقاوم ممتاز للجفاف",
        soil: 70, soilText: "متنوعة", soilNote: "يتحمل الملوحة",
        fert: 40, fertText: "متوسط", fertNote: "في بداية الربيع"
    },
    "الليمون": {
        latin: "Citrus limon",
        image: "images/fruit_الليمون.png",
        description: "تحتاج إلى عناية معتدلة وتنتج ثماراً طوال العام.",
        sun: 75, sunText: "كاملة", sunNote: "8 ساعات شمس على الأقل",
        water: 55, waterText: "عالية", waterNote: "ري عميق ومنتظم",
        soil: 75, soilText: "خصبة", soilNote: "جيدة التصريف",
        fert: 50, fertText: "عالي", fertNote: "سماد حمضيات فصلي"
    },
    "العنب": {
        latin: "Vitis vinifera",
        image: "images/fruit_العنب.png",
        description: "نبات متسلق مثمر. سهل الزراعة وينتج عناقيد فاكهة لذيذة.",
        sun: 80, sunText: "كاملة", sunNote: "مكان مشمس دافئ",
        water: 45, waterText: "متوسطة", waterNote: "ري منتظم",
        soil: 70, soilText: "عادية", soilNote: "جيدة الصرف والتهوية",
        fert: 45, fertText: "متوسط", fertNote: "بانتظام في موسم النمو"
    }
};




/**
 * Function to load plant details
 */
function loadPlantDetails() {
    // 1. Get the plant name from URL parameter "?plant=Nome"
    const urlParams = new URLSearchParams(window.location.search);
    const plantName = urlParams.get('plant');

    if (!plantName || !plantsData[plantName]) {
        console.log("No dynamic plant data found for:", plantName);
        return;
    }

    const data = plantsData[plantName];

    // 2. Update HTML Elements
    // Title & Subtitle
    document.querySelector('.plant-title-section h1').textContent = plantName;
    if (data.latin) document.querySelector('.plant-title-section .subtitle').textContent = data.latin;

    // Image
    const imgElement = document.querySelector('.main-plant-image');
    if (imgElement && data.image) {
        imgElement.src = data.image;
        imgElement.alt = plantName;
    }

    // Description
    if (data.description) {
        document.querySelector('.desc-content').innerHTML = `<p>${data.description}</p>`;
    }

    // Sliders & Values
    updateSlider('sun', data.sun, data.sunText, data.sunNote);
    updateSlider('water', data.water, data.waterText, data.waterNote);
    updateSlider('soil', data.soil, data.soilText, data.soilNote);
    updateSlider('fertilizer', data.fert, data.fertText, data.fertNote);
}

function updateSlider(type, value, text, note) {
    let selector = `.${type}-slider`;
    const slider = document.querySelector(selector);
    const valueSpan = slider ? slider.parentElement.querySelector('.value-text') : null;
    const noteP = slider ? slider.parentElement.parentElement.querySelector('.req-note') : null;

    if (slider) {
        slider.value = value;
        // Visual Fill for cross-browser consistency (RTL)
        let color = '#ccc';
        if (type === 'sun') color = '#fbc02d';
        if (type === 'water') color = '#039be5';
        if (type === 'soil') color = '#795548';
        if (type === 'fertilizer') color = '#43a047';

        // In RTL, the slider value increases from right to left. 
        // Chrome/Edge/Safari support linear-gradient background for range inputs.
        slider.style.background = `linear-gradient(to left, ${color} ${value}%, #e0e0e0 ${value}%)`;
    }
    if (valueSpan && text) valueSpan.textContent = text;
    if (noteP && note) noteP.textContent = note;
}

// Run on load
document.addEventListener('DOMContentLoaded', loadPlantDetails);
