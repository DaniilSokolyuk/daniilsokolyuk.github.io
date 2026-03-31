import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const BASE = import.meta.dir;
const template = readFileSync(join(BASE, "template.html"), "utf-8");
const style = readFileSync(join(BASE, "style.css"), "utf-8");

interface Lang {
  html_lang: string;
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  keywords: string;
  subtitle: string;
  download: string;
  features_title: string;
  features_sub: string;
  f1_title: string; f1_desc: string;
  f2_title: string; f2_desc: string;
  f3_title: string; f3_desc: string;
  f4_title: string; f4_desc: string;
  f5_title: string; f5_desc: string;
  f6_title: string; f6_desc: string;
  action_title: string; action_sub: string;
  s1: string; s2: string; s3: string; s4: string; s5: string; s6: string;
  compat_title: string; compat_sub: string;
  c1: string; c2: string; c3: string; c4: string;
  cta_title: string; cta_sub: string;
}

const langs: Record<string, Lang> = {
  en: {
    html_lang: "en",
    title: "BGD Flasher — Firmware & Telemetry App for Begode, Gotway & SV Electric Unicycles",
    description: "Flash firmware, monitor real-time telemetry, adjust settings, and track BMS cell data on your Begode, Gotway, or SV electric unicycle. Free iOS app.",
    og_title: "BGD Flasher — EUC Telemetry & Firmware Tool",
    og_description: "Flash firmware, monitor real-time telemetry, and fine-tune your Begode, Gotway & SV electric unicycle.",
    keywords: "begode, gotway, euc, electric unicycle, firmware, flasher, telemetry, bms, dashboard, speed, battery, sv, extremebull, monowheel",
    subtitle: "Firmware flashing, real-time telemetry, and full settings control for Begode, Gotway & SV electric unicycles.",
    download: "Download",
    features_title: "Everything your wheel needs",
    features_sub: "Monitor, configure, and update your electric unicycle from a single app.",
    f1_title: "Real-Time Telemetry", f1_desc: "Live speed, voltage, current, power, PWM, temperature, trip distance, and session statistics — all streamed over Bluetooth in real time.",
    f2_title: "Dual BMS Monitoring", f2_desc: "Per-cell voltage for up to 48 cells across two battery packs. Track min/max/average, temperature sensors, and detect cell imbalance early.",
    f3_title: "Race Dashboard", f3_desc: "Fullscreen speed and PWM gauges with dynamic color warnings. Track top speed and max PWM in immersive portrait or landscape mode.",
    f4_title: "Firmware Flashing", f4_desc: "Browse the firmware catalog or load custom files. YMODEM protocol with CRC16 verification and MD5 hash validation for safe transfers.",
    f5_title: "Wheel Settings", f5_desc: "Ride mode, speed limiter, alarms, LED mode, beeper volume, roll angle, gyroscope calibration — adjust everything over Bluetooth.",
    f6_title: "Private & Ad-Free", f6_desc: "No accounts, no analytics, no ads, no tracking. All data stays on your device. Open community-driven development.",
    action_title: "See it in action", action_sub: "Designed for riders who want full control over their wheel.",
    s1: "Race Dashboard", s2: "Live Telemetry", s3: "Metrics Grid", s4: "BMS Cell Monitor", s5: "Flash Firmware", s6: "Wheel Settings",
    compat_title: "Supported wheels", compat_sub: "Works with all Begode/Gotway BLE-compatible electric unicycles.",
    c1: "Stock firmware", c2: "JN firmware", c3: "CF custom firmware", c4: "BF firmware with advanced BMS",
    cta_title: "Ready to ride?", cta_sub: "Download BGD Flasher for free.",
  },
  ru: {
    html_lang: "ru",
    title: "BGD Flasher — Прошивка и телеметрия для моноколёс Begode, Gotway и SV",
    description: "Прошивка, телеметрия в реальном времени, настройки и мониторинг BMS для моноколёс Begode, Gotway и SV. Бесплатное приложение.",
    og_title: "BGD Flasher — Телеметрия и прошивка для моноколёс",
    og_description: "Прошивайте прошивки, следите за телеметрией и настраивайте моноколёса Begode, Gotway и SV.",
    keywords: "begode, gotway, моноколесо, электрическое моноколесо, прошивка, телеметрия, euc, bms, скорость, батарея, sv, extremebull",
    subtitle: "Прошивка, телеметрия в реальном времени и полный контроль настроек для моноколёс Begode, Gotway и SV.",
    download: "Скачать",
    features_title: "Всё, что нужно вашему колесу", features_sub: "Мониторинг, настройка и обновление моноколеса из одного приложения.",
    f1_title: "Телеметрия в реальном времени", f1_desc: "Скорость, напряжение, ток, мощность, PWM, температура, пробег и статистика поездки — всё в реальном времени по Bluetooth.",
    f2_title: "Мониторинг двух BMS", f2_desc: "Напряжение каждой ячейки для 48 ячеек в двух батареях. Мин/макс/среднее, датчики температуры и раннее обнаружение дисбаланса.",
    f3_title: "Гоночная панель", f3_desc: "Полноэкранные спидометр и PWM с динамическим цветом. Отслеживание макс. скорости и PWM в портретном и ландшафтном режимах.",
    f4_title: "Прошивка", f4_desc: "Каталог прошивок или загрузка своих файлов. Протокол YMODEM с CRC16 и проверкой MD5 для безопасной передачи.",
    f5_title: "Настройки колеса", f5_desc: "Режим езды, ограничитель скорости, сигнализация, LED, громкость, угол наклона, калибровка гироскопа — всё через Bluetooth.",
    f6_title: "Без рекламы и трекинга", f6_desc: "Без аккаунтов, аналитики, рекламы и отслеживания. Все данные остаются на вашем устройстве.",
    action_title: "Посмотрите в действии", action_sub: "Создано для райдеров, которые хотят полный контроль над колесом.",
    s1: "Гоночная панель", s2: "Телеметрия", s3: "Сетка метрик", s4: "Мониторинг BMS", s5: "Прошивка", s6: "Настройки",
    compat_title: "Поддерживаемые колёса", compat_sub: "Работает со всеми BLE-совместимыми моноколёсами Begode/Gotway.",
    c1: "Стоковая прошивка", c2: "Прошивка JN", c3: "Кастомная прошивка CF", c4: "Прошивка BF с BMS",
    cta_title: "Готовы к поездке?", cta_sub: "Скачайте BGD Flasher бесплатно.",
  },
  de: {
    html_lang: "de",
    title: "BGD Flasher — Firmware & Telemetrie App für Begode, Gotway & SV Einräder",
    description: "Firmware flashen, Echtzeit-Telemetrie, Einstellungen und BMS-Zelldaten für Begode, Gotway und SV Einräder. Kostenlose App.",
    og_title: "BGD Flasher — EUC Telemetrie & Firmware Tool",
    og_description: "Firmware flashen, Echtzeit-Telemetrie und Einstellungen für Begode, Gotway & SV Einräder.",
    keywords: "begode, gotway, euc, einrad, elektro einrad, firmware, telemetrie, bms, dashboard, geschwindigkeit, batterie, sv, extremebull",
    subtitle: "Firmware flashen, Echtzeit-Telemetrie und vollständige Einstellungskontrolle für Begode, Gotway & SV Einräder.",
    download: "Download",
    features_title: "Alles was dein Rad braucht", features_sub: "Überwache, konfiguriere und aktualisiere dein Einrad aus einer App.",
    f1_title: "Echtzeit-Telemetrie", f1_desc: "Geschwindigkeit, Spannung, Strom, Leistung, PWM, Temperatur, Strecke und Sitzungsstatistiken — alles live über Bluetooth.",
    f2_title: "Dual-BMS-Überwachung", f2_desc: "Zellenspannung für bis zu 48 Zellen in zwei Batteriepacks. Min/Max/Durchschnitt, Temperatursensoren und frühzeitige Erkennung von Ungleichgewichten.",
    f3_title: "Renn-Dashboard", f3_desc: "Vollbild-Tachometer und PWM-Anzeigen mit dynamischen Farbwarnungen. Höchstgeschwindigkeit und Max-PWM im Hoch- oder Querformat.",
    f4_title: "Firmware flashen", f4_desc: "Firmware-Katalog durchsuchen oder eigene Dateien laden. YMODEM-Protokoll mit CRC16- und MD5-Überprüfung.",
    f5_title: "Rad-Einstellungen", f5_desc: "Fahrmodus, Geschwindigkeitsbegrenzer, Alarme, LED, Lautstärke, Neigungswinkel, Gyroskop-Kalibrierung — alles über Bluetooth.",
    f6_title: "Privat & werbefrei", f6_desc: "Keine Konten, keine Analytik, keine Werbung. Alle Daten bleiben auf deinem Gerät.",
    action_title: "In Aktion sehen", action_sub: "Entwickelt für Fahrer, die volle Kontrolle über ihr Rad wollen.",
    s1: "Renn-Dashboard", s2: "Live-Telemetrie", s3: "Metrik-Raster", s4: "BMS-Zellen", s5: "Firmware flashen", s6: "Einstellungen",
    compat_title: "Unterstützte Räder", compat_sub: "Funktioniert mit allen BLE-kompatiblen Begode/Gotway Einrädern.",
    c1: "Stock-Firmware", c2: "JN-Firmware", c3: "CF Custom-Firmware", c4: "BF-Firmware mit BMS",
    cta_title: "Bereit zu fahren?", cta_sub: "Lade BGD Flasher kostenlos herunter.",
  },
  fr: {
    html_lang: "fr", title: "BGD Flasher — Firmware et télémétrie pour monoroues Begode, Gotway et SV",
    description: "Flasher le firmware, télémétrie en temps réel, réglages et données BMS pour monoroues Begode, Gotway et SV. Application gratuite.",
    og_title: "BGD Flasher — Télémétrie et firmware pour monoroues", og_description: "Flashez le firmware, surveillez la télémétrie et configurez votre monoroue Begode, Gotway ou SV.",
    keywords: "begode, gotway, euc, monoroue, roue électrique, firmware, télémétrie, bms, tableau de bord, vitesse, batterie, sv, extremebull",
    subtitle: "Flash de firmware, télémétrie en temps réel et contrôle complet des réglages pour monoroues Begode, Gotway et SV.",
    download: "Télécharger",
    features_title: "Tout ce dont votre roue a besoin", features_sub: "Surveillez, configurez et mettez à jour votre monoroue depuis une seule application.",
    f1_title: "Télémétrie en temps réel", f1_desc: "Vitesse, tension, courant, puissance, PWM, température, distance et statistiques de session — le tout en direct via Bluetooth.",
    f2_title: "Surveillance double BMS", f2_desc: "Tension par cellule pour jusqu'à 48 cellules sur deux packs batterie. Min/max/moyenne, capteurs de température et détection précoce de déséquilibre.",
    f3_title: "Tableau de bord course", f3_desc: "Jauges de vitesse et PWM plein écran avec avertissements de couleur dynamiques. Suivi de la vitesse max et du PWM max.",
    f4_title: "Flash de firmware", f4_desc: "Parcourez le catalogue de firmwares ou chargez vos fichiers. Protocole YMODEM avec vérification CRC16 et validation MD5.",
    f5_title: "Réglages de la roue", f5_desc: "Mode de conduite, limiteur de vitesse, alarmes, LED, volume du bip, angle d'inclinaison, calibration du gyroscope — tout via Bluetooth.",
    f6_title: "Privé et sans publicité", f6_desc: "Pas de comptes, pas d'analytics, pas de pubs, pas de tracking. Toutes les données restent sur votre appareil.",
    action_title: "Voir en action", action_sub: "Conçu pour les riders qui veulent un contrôle total sur leur roue.",
    s1: "Dashboard course", s2: "Télémétrie live", s3: "Grille de métriques", s4: "Moniteur BMS", s5: "Flash firmware", s6: "Réglages",
    compat_title: "Roues supportées", compat_sub: "Compatible avec toutes les monoroues Begode/Gotway BLE.",
    c1: "Firmware stock", c2: "Firmware JN", c3: "Firmware custom CF", c4: "Firmware BF avec BMS",
    cta_title: "Prêt à rouler ?", cta_sub: "Téléchargez BGD Flasher gratuitement.",
  },
  es: {
    html_lang: "es", title: "BGD Flasher — Firmware y telemetría para monociclos Begode, Gotway y SV",
    description: "Flashea firmware, telemetría en tiempo real, ajustes y datos BMS para monociclos eléctricos Begode, Gotway y SV. App gratuita.",
    og_title: "BGD Flasher — Telemetría y firmware para monociclos", og_description: "Flashea firmware, monitorea telemetría y configura tu monociclo Begode, Gotway o SV.",
    keywords: "begode, gotway, euc, monociclo eléctrico, firmware, telemetría, bms, velocidad, batería, sv, extremebull",
    subtitle: "Flasheo de firmware, telemetría en tiempo real y control total de ajustes para monociclos Begode, Gotway y SV.",
    download: "Descargar",
    features_title: "Todo lo que tu rueda necesita", features_sub: "Monitorea, configura y actualiza tu monociclo eléctrico desde una sola app.",
    f1_title: "Telemetría en tiempo real", f1_desc: "Velocidad, voltaje, corriente, potencia, PWM, temperatura, distancia y estadísticas de sesión — todo en vivo por Bluetooth.",
    f2_title: "Monitoreo dual BMS", f2_desc: "Voltaje por celda para hasta 48 celdas en dos packs de batería. Mín/máx/promedio, sensores de temperatura y detección temprana de desbalance.",
    f3_title: "Panel de carreras", f3_desc: "Indicadores de velocidad y PWM a pantalla completa con alertas de color dinámicas. Seguimiento de velocidad máxima y PWM máximo.",
    f4_title: "Flasheo de firmware", f4_desc: "Navega el catálogo de firmware o carga archivos propios. Protocolo YMODEM con verificación CRC16 y validación MD5.",
    f5_title: "Ajustes de rueda", f5_desc: "Modo de conducción, limitador de velocidad, alarmas, LED, volumen, ángulo de inclinación, calibración del giroscopio — todo por Bluetooth.",
    f6_title: "Privado y sin anuncios", f6_desc: "Sin cuentas, sin analíticas, sin anuncios, sin tracking. Todos los datos permanecen en tu dispositivo.",
    action_title: "Míralo en acción", action_sub: "Diseñado para riders que quieren control total sobre su rueda.",
    s1: "Panel de carreras", s2: "Telemetría en vivo", s3: "Cuadrícula de métricas", s4: "Monitor BMS", s5: "Flash firmware", s6: "Ajustes",
    compat_title: "Ruedas soportadas", compat_sub: "Compatible con todos los monociclos Begode/Gotway con BLE.",
    c1: "Firmware stock", c2: "Firmware JN", c3: "Firmware custom CF", c4: "Firmware BF con BMS",
    cta_title: "¿Listo para rodar?", cta_sub: "Descarga BGD Flasher gratis.",
  },
  pt: {
    html_lang: "pt", title: "BGD Flasher — Firmware e telemetria para monociclos Begode, Gotway e SV",
    description: "Flash de firmware, telemetria em tempo real, configurações e dados BMS para monociclos Begode, Gotway e SV. App gratuito.",
    og_title: "BGD Flasher — Telemetria e firmware para monociclos", og_description: "Flash de firmware, telemetria em tempo real e configurações para monociclos Begode, Gotway e SV.",
    keywords: "begode, gotway, euc, monociclo elétrico, firmware, telemetria, bms, velocidade, bateria, sv, extremebull",
    subtitle: "Flash de firmware, telemetria em tempo real e controle total de configurações para monociclos Begode, Gotway e SV.",
    download: "Baixar",
    features_title: "Tudo que sua roda precisa", features_sub: "Monitore, configure e atualize seu monociclo a partir de um único app.",
    f1_title: "Telemetria em tempo real", f1_desc: "Velocidade, tensão, corrente, potência, PWM, temperatura, distância e estatísticas — tudo ao vivo via Bluetooth.",
    f2_title: "Monitoramento dual BMS", f2_desc: "Tensão por célula para até 48 células em dois packs. Mín/máx/média, sensores de temperatura e detecção precoce de desbalanceamento.",
    f3_title: "Painel de corrida", f3_desc: "Medidores de velocidade e PWM em tela cheia com alertas dinâmicos de cor. Rastreamento de velocidade máxima e PWM máximo.",
    f4_title: "Flash de firmware", f4_desc: "Navegue pelo catálogo ou carregue seus arquivos. Protocolo YMODEM com verificação CRC16 e validação MD5.",
    f5_title: "Configurações da roda", f5_desc: "Modo de pilotagem, limitador de velocidade, alarmes, LED, volume, ângulo de inclinação, calibração do giroscópio — tudo via Bluetooth.",
    f6_title: "Privado e sem anúncios", f6_desc: "Sem contas, sem analytics, sem anúncios, sem rastreamento. Todos os dados ficam no seu dispositivo.",
    action_title: "Veja em ação", action_sub: "Projetado para pilotos que querem controle total sobre sua roda.",
    s1: "Painel de corrida", s2: "Telemetria ao vivo", s3: "Grade de métricas", s4: "Monitor BMS", s5: "Flash firmware", s6: "Configurações",
    compat_title: "Rodas suportadas", compat_sub: "Funciona com todos os monociclos Begode/Gotway compatíveis com BLE.",
    c1: "Firmware stock", c2: "Firmware JN", c3: "Firmware custom CF", c4: "Firmware BF com BMS",
    cta_title: "Pronto para pedalar?", cta_sub: "Baixe o BGD Flasher gratuitamente.",
  },
  zh: {
    html_lang: "zh", title: "BGD Flasher — Begode、Gotway、SV电动独轮车固件和遥测应用",
    description: "固件刷写、实时遥测、设置管理和BMS电池监控，适用于Begode、Gotway和SV电动独轮车。免费应用。",
    og_title: "BGD Flasher — 电动独轮车遥测和固件工具", og_description: "刷写固件、实时遥测监控，配置您的Begode、Gotway和SV电动独轮车。",
    keywords: "begode, gotway, euc, 电动独轮车, 固件, 遥测, bms, 仪表盘, 速度, 电池, sv, extremebull",
    subtitle: "固件刷写、实时遥测和全面设置控制，适用于Begode、Gotway和SV电动独轮车。",
    download: "下载",
    features_title: "您的车轮所需的一切", features_sub: "通过一个应用监控、配置和更新您的电动独轮车。",
    f1_title: "实时遥测", f1_desc: "速度、电压、电流、功率、PWM、温度、行程距离和会话统计——通过蓝牙实时传输。",
    f2_title: "双BMS监控", f2_desc: "两组电池组最多48个电芯的单芯电压。最小/最大/平均值、温度传感器和电芯失衡早期检测。",
    f3_title: "竞速仪表盘", f3_desc: "全屏速度和PWM仪表，带动态颜色警告。在纵向或横向模式下跟踪最高速度和最大PWM。",
    f4_title: "固件刷写", f4_desc: "浏览固件目录或加载自定义文件。YMODEM协议，CRC16校验和MD5验证，确保安全传输。",
    f5_title: "车轮设置", f5_desc: "骑行模式、速度限制器、警报、LED、蜂鸣器音量、倾斜角度、陀螺仪校准——全部通过蓝牙调整。",
    f6_title: "隐私无广告", f6_desc: "无需账户、无分析、无广告、无追踪。所有数据留在您的设备上。",
    action_title: "查看实际效果", action_sub: "专为想要完全控制车轮的骑手设计。",
    s1: "竞速仪表盘", s2: "实时遥测", s3: "数据网格", s4: "BMS监控", s5: "固件刷写", s6: "车轮设置",
    compat_title: "支持的车轮", compat_sub: "兼容所有支持BLE的Begode/Gotway电动独轮车。",
    c1: "原厂固件", c2: "JN固件", c3: "CF自定义固件", c4: "BF固件（含BMS）",
    cta_title: "准备出发？", cta_sub: "免费下载BGD Flasher。",
  },
  ja: {
    html_lang: "ja", title: "BGD Flasher — Begode・Gotway・SV電動一輪車のファームウェア＆テレメトリアプリ",
    description: "ファームウェア更新、リアルタイムテレメトリ、設定管理、BMSセルデータをBegode、Gotway、SV電動一輪車で。無料アプリ。",
    og_title: "BGD Flasher — EUCテレメトリ＆ファームウェアツール", og_description: "ファームウェアの書き込み、リアルタイムテレメトリの監視、Begode・Gotway・SV電動一輪車の設定。",
    keywords: "begode, gotway, euc, 電動一輪車, ファームウェア, テレメトリ, bms, ダッシュボード, 速度, バッテリー, sv, extremebull",
    subtitle: "ファームウェア書き込み、リアルタイムテレメトリ、Begode・Gotway・SV電動一輪車の完全な設定制御。",
    download: "ダウンロード",
    features_title: "ホイールに必要なすべて", features_sub: "1つのアプリから電動一輪車を監視、設定、更新。",
    f1_title: "リアルタイムテレメトリ", f1_desc: "速度、電圧、電流、電力、PWM、温度、走行距離、セッション統計—すべてBluetoothでリアルタイムに。",
    f2_title: "デュアルBMS監視", f2_desc: "2つのバッテリーパックで最大48セルのセル電圧。最小/最大/平均、温度センサー、セル不均衡の早期検出。",
    f3_title: "レースダッシュボード", f3_desc: "フルスクリーンの速度計とPWMゲージ、動的なカラー警告付き。最高速度と最大PWMをトラッキング。",
    f4_title: "ファームウェア書き込み", f4_desc: "カタログを閲覧するか独自ファイルを読み込み。CRC16検証とMD5ハッシュ検証付きYMODEMプロトコル。",
    f5_title: "ホイール設定", f5_desc: "走行モード、速度リミッター、アラーム、LED、ビーパー音量、傾斜角、ジャイロ校正—すべてBluetooth経由。",
    f6_title: "プライベート＆広告なし", f6_desc: "アカウント不要、分析なし、広告なし、トラッキングなし。すべてのデータはデバイス上に保持。",
    action_title: "動作を見る", action_sub: "ホイールの完全なコントロールを求めるライダーのために設計。",
    s1: "レースダッシュボード", s2: "ライブテレメトリ", s3: "メトリクスグリッド", s4: "BMSモニター", s5: "ファームウェア書き込み", s6: "設定",
    compat_title: "対応ホイール", compat_sub: "すべてのBLE対応Begode/Gotway電動一輪車に対応。",
    c1: "ストックファームウェア", c2: "JNファームウェア", c3: "CFカスタムファームウェア", c4: "BFファームウェア（BMS付き）",
    cta_title: "走る準備は？", cta_sub: "BGD Flasherを無料でダウンロード。",
  },
  ko: {
    html_lang: "ko", title: "BGD Flasher — Begode, Gotway, SV 전동 외발자전거 펌웨어 및 텔레메트리 앱",
    description: "펌웨어 플래싱, 실시간 텔레메트리, 설정 관리 및 BMS 셀 데이터를 Begode, Gotway, SV 전동 외발자전거에서. 무료 앱.",
    og_title: "BGD Flasher — EUC 텔레메트리 및 펌웨어 도구", og_description: "펌웨어 플래싱, 실시간 텔레메트리, Begode, Gotway, SV 전동 외발자전거 설정.",
    keywords: "begode, gotway, euc, 전동 외발자전거, 펌웨어, 텔레메트리, bms, 대시보드, 속도, 배터리, sv, extremebull",
    subtitle: "펌웨어 플래싱, 실시간 텔레메트리, Begode, Gotway & SV 전동 외발자전거의 완전한 설정 제어.",
    download: "다운로드",
    features_title: "휠에 필요한 모든 것", features_sub: "하나의 앱에서 전동 외발자전거를 모니터링, 설정, 업데이트.",
    f1_title: "실시간 텔레메트리", f1_desc: "속도, 전압, 전류, 전력, PWM, 온도, 주행 거리 및 세션 통계 — 블루투스로 실시간 전송.",
    f2_title: "듀얼 BMS 모니터링", f2_desc: "두 배터리 팩에서 최대 48셀의 셀 전압. 최소/최대/평균, 온도 센서 및 셀 불균형 조기 감지.",
    f3_title: "레이스 대시보드", f3_desc: "동적 색상 경고가 있는 전체 화면 속도계와 PWM 게이지. 최고 속도와 최대 PWM 추적.",
    f4_title: "펌웨어 플래싱", f4_desc: "펌웨어 카탈로그 탐색 또는 커스텀 파일 로드. CRC16 검증 및 MD5 해시 검증이 포함된 YMODEM 프로토콜.",
    f5_title: "휠 설정", f5_desc: "주행 모드, 속도 제한기, 알람, LED, 비프 볼륨, 기울기 각도, 자이로스코프 캘리브레이션 — 모두 블루투스로.",
    f6_title: "프라이빗 & 광고 없음", f6_desc: "계정 불필요, 분석 없음, 광고 없음, 추적 없음. 모든 데이터는 기기에 보관.",
    action_title: "실제 동작 확인", action_sub: "휠의 완전한 제어를 원하는 라이더를 위해 설계.",
    s1: "레이스 대시보드", s2: "라이브 텔레메트리", s3: "메트릭 그리드", s4: "BMS 모니터", s5: "펌웨어 플래싱", s6: "설정",
    compat_title: "지원 휠", compat_sub: "모든 BLE 호환 Begode/Gotway 전동 외발자전거와 호환.",
    c1: "스톡 펌웨어", c2: "JN 펌웨어", c3: "CF 커스텀 펌웨어", c4: "BF 펌웨어 (BMS 포함)",
    cta_title: "달릴 준비 되셨나요?", cta_sub: "BGD Flasher를 무료로 다운로드하세요.",
  },
  it: {
    html_lang: "it", title: "BGD Flasher — Firmware e telemetria per monoruote Begode, Gotway e SV",
    description: "Flash firmware, telemetria in tempo reale, impostazioni e dati BMS per monoruote Begode, Gotway e SV. App gratuita.",
    og_title: "BGD Flasher — Telemetria e firmware per monoruote", og_description: "Flash firmware, telemetria in tempo reale e impostazioni per monoruote Begode, Gotway e SV.",
    keywords: "begode, gotway, euc, monoruota elettrica, firmware, telemetria, bms, cruscotto, velocità, batteria, sv, extremebull",
    subtitle: "Flash firmware, telemetria in tempo reale e controllo completo delle impostazioni per monoruote Begode, Gotway e SV.",
    download: "Scarica",
    features_title: "Tutto ciò che la tua ruota ha bisogno", features_sub: "Monitora, configura e aggiorna la tua monoruota da un'unica app.",
    f1_title: "Telemetria in tempo reale", f1_desc: "Velocità, tensione, corrente, potenza, PWM, temperatura, distanza e statistiche sessione — tutto in diretta via Bluetooth.",
    f2_title: "Monitoraggio doppio BMS", f2_desc: "Tensione per cella fino a 48 celle su due pacchi batteria. Min/max/media, sensori di temperatura e rilevamento precoce squilibrio.",
    f3_title: "Cruscotto da gara", f3_desc: "Indicatori velocità e PWM a schermo intero con avvisi colore dinamici. Tracciamento velocità massima e PWM massimo.",
    f4_title: "Flash firmware", f4_desc: "Sfoglia il catalogo firmware o carica file personalizzati. Protocollo YMODEM con verifica CRC16 e validazione MD5.",
    f5_title: "Impostazioni ruota", f5_desc: "Modalità guida, limitatore velocità, allarmi, LED, volume beep, angolo inclinazione, calibrazione giroscopio — tutto via Bluetooth.",
    f6_title: "Privato e senza pubblicità", f6_desc: "Nessun account, nessuna analytics, nessuna pubblicità, nessun tracking. Tutti i dati restano sul tuo dispositivo.",
    action_title: "Guardalo in azione", action_sub: "Progettato per rider che vogliono il controllo totale sulla loro ruota.",
    s1: "Cruscotto da gara", s2: "Telemetria live", s3: "Griglia metriche", s4: "Monitor BMS", s5: "Flash firmware", s6: "Impostazioni",
    compat_title: "Ruote supportate", compat_sub: "Compatibile con tutte le monoruote Begode/Gotway BLE.",
    c1: "Firmware stock", c2: "Firmware JN", c3: "Firmware custom CF", c4: "Firmware BF con BMS",
    cta_title: "Pronto a pedalare?", cta_sub: "Scarica BGD Flasher gratuitamente.",
  },
  tr: {
    html_lang: "tr", title: "BGD Flasher — Begode, Gotway ve SV Elektrikli Tek Tekerlekli için Firmware ve Telemetri",
    description: "Firmware yükleme, gerçek zamanlı telemetri, ayarlar ve BMS hücre verileri. Begode, Gotway ve SV için. Ücretsiz uygulama.",
    og_title: "BGD Flasher — EUC Telemetri ve Firmware Aracı", og_description: "Firmware yükleyin, gerçek zamanlı telemetri izleyin, Begode, Gotway ve SV araçlarınızı yapılandırın.",
    keywords: "begode, gotway, euc, elektrikli tek tekerlekli, firmware, telemetri, bms, gösterge paneli, hız, batarya, sv, extremebull",
    subtitle: "Firmware yükleme, gerçek zamanlı telemetri ve Begode, Gotway & SV elektrikli tek tekerlekli araçlar için tam ayar kontrolü.",
    download: "İndir",
    features_title: "Tekerleğinizin ihtiyacı olan her şey", features_sub: "Tek bir uygulamadan elektrikli tek tekerleğinizi izleyin, yapılandırın ve güncelleyin.",
    f1_title: "Gerçek zamanlı telemetri", f1_desc: "Hız, voltaj, akım, güç, PWM, sıcaklık, mesafe ve oturum istatistikleri — Bluetooth ile canlı.",
    f2_title: "Çift BMS izleme", f2_desc: "İki batarya paketinde 48 hücreye kadar hücre voltajı. Min/maks/ortalama, sıcaklık sensörleri ve dengesizlik erken tespiti.",
    f3_title: "Yarış gösterge paneli", f3_desc: "Dinamik renk uyarıları ile tam ekran hız ve PWM göstergeleri. Maksimum hız ve PWM takibi.",
    f4_title: "Firmware yükleme", f4_desc: "Firmware kataloğuna göz atın veya özel dosyalar yükleyin. CRC16 ve MD5 doğrulama ile YMODEM protokolü.",
    f5_title: "Tekerlek ayarları", f5_desc: "Sürüş modu, hız sınırlayıcı, alarmlar, LED, bip sesi, eğim açısı, jiroskop kalibrasyonu — hepsi Bluetooth ile.",
    f6_title: "Gizli ve reklamsız", f6_desc: "Hesap yok, analitik yok, reklam yok, izleme yok. Tüm veriler cihazınızda kalır.",
    action_title: "Çalışırken görün", action_sub: "Tekerlekleri üzerinde tam kontrol isteyen sürücüler için tasarlandı.",
    s1: "Yarış paneli", s2: "Canlı telemetri", s3: "Metrik ızgarası", s4: "BMS monitör", s5: "Firmware yükleme", s6: "Ayarlar",
    compat_title: "Desteklenen tekerlekler", compat_sub: "Tüm BLE uyumlu Begode/Gotway elektrikli tek tekerlekli araçlarla çalışır.",
    c1: "Stok firmware", c2: "JN firmware", c3: "CF özel firmware", c4: "BF firmware (BMS ile)",
    cta_title: "Sürmeye hazır mısınız?", cta_sub: "BGD Flasher'ı ücretsiz indirin.",
  },
};

// Build hreflang block
const codes = Object.keys(langs);
const hreflangBlock = codes
  .map(c => `    <link rel="alternate" hreflang="${c}" href="https://sokoly.uk/bgdflasher${c === "en" ? "" : `/${c}`}">`)
  .concat(['    <link rel="alternate" hreflang="x-default" href="https://sokoly.uk/bgdflasher">'])
  .join("\n");

function render(t: Lang, code: string): string {
  const isRoot = code === "en";
  const prefix = isRoot ? "" : "../";
  const canonical = isRoot ? "https://sokoly.uk/bgdflasher" : `https://sokoly.uk/bgdflasher/${code}`;
  const cssHref = isRoot ? "style.css" : "../style.css";

  return template
    .replaceAll("{{html_lang}}", t.html_lang)
    .replaceAll("{{title}}", t.title)
    .replaceAll("{{description}}", t.description)
    .replaceAll("{{og_title}}", t.og_title)
    .replaceAll("{{og_description}}", t.og_description)
    .replaceAll("{{keywords}}", t.keywords)
    .replaceAll("{{canonical}}", canonical)
    .replaceAll("{{hreflang}}", hreflangBlock)
    .replaceAll("{{css_href}}", cssHref)
    .replaceAll("{{prefix}}", prefix)
    .replaceAll("{{subtitle}}", t.subtitle)
    .replaceAll("{{download}}", t.download)
    .replaceAll("{{features_title}}", t.features_title)
    .replaceAll("{{features_sub}}", t.features_sub)
    .replaceAll("{{f1_title}}", t.f1_title).replaceAll("{{f1_desc}}", t.f1_desc)
    .replaceAll("{{f2_title}}", t.f2_title).replaceAll("{{f2_desc}}", t.f2_desc)
    .replaceAll("{{f3_title}}", t.f3_title).replaceAll("{{f3_desc}}", t.f3_desc)
    .replaceAll("{{f4_title}}", t.f4_title).replaceAll("{{f4_desc}}", t.f4_desc)
    .replaceAll("{{f5_title}}", t.f5_title).replaceAll("{{f5_desc}}", t.f5_desc)
    .replaceAll("{{f6_title}}", t.f6_title).replaceAll("{{f6_desc}}", t.f6_desc)
    .replaceAll("{{action_title}}", t.action_title).replaceAll("{{action_sub}}", t.action_sub)
    .replaceAll("{{s1}}", t.s1).replaceAll("{{s2}}", t.s2).replaceAll("{{s3}}", t.s3)
    .replaceAll("{{s4}}", t.s4).replaceAll("{{s5}}", t.s5).replaceAll("{{s6}}", t.s6)
    .replaceAll("{{compat_title}}", t.compat_title).replaceAll("{{compat_sub}}", t.compat_sub)
    .replaceAll("{{c1}}", t.c1).replaceAll("{{c2}}", t.c2).replaceAll("{{c3}}", t.c3).replaceAll("{{c4}}", t.c4)
    .replaceAll("{{cta_title}}", t.cta_title).replaceAll("{{cta_sub}}", t.cta_sub);
}

// Generate all pages
for (const [code, t] of Object.entries(langs)) {
  const html = render(t, code);
  if (code === "en") {
    writeFileSync(join(BASE, "index.html"), html);
  } else {
    mkdirSync(join(BASE, code), { recursive: true });
    writeFileSync(join(BASE, code, "index.html"), html);
  }
}

console.log(`Generated ${codes.length} pages: ${codes.join(", ")}`);
