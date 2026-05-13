# SupplyShield - Yapay Zeka Destekli Tedarik Zinciri Yönetimi

SupplyShield, küçük ve orta ölçekli işletmeler için geliştirilmiş bir tedarik zinciri risk yönetimi ve stok erken uyarı platformudur. Proje; stok seviyelerini, tedarikçi güvenilirliğini, temin süresini, talep değişkenliğini ve coğrafi riskleri analiz ederek ürün bazlı risk skoru üretir.

Platform, 7 uzman ajanlı bir karar akışıyla risk analizi, talep tahmini, alternatif tedarikçi önerisi, lojistik planlama ve öncelikli aksiyon planı oluşturur.

## Özellikler

- **Risk Analizi:** Stok, tedarikçi güvenilirliği, coğrafi risk, talep değişkenliği ve temin süresi faktörlerini değerlendirir.
- **Talep Tahmini:** 30 günlük talep tahmini üretir; arayüzde 14 günlük grafik görünümü sunar.
- **Alternatif Tedarikçi Keşfi:** Mevcut tedarikçi ağı ve kategori bazlı adaylarla alternatif tedarikçiler önerir.
- **Lojistik Optimizasyonu:** EOQ benzeri hesaplama ile sipariş miktarı, sevkiyat yöntemi, tahmini maliyet ve varış tarihi belirler.
- **Aksiyon Planı:** Ajan çıktılarından öncelikli ve uygulanabilir iş adımları üretir.
- **Çok Kullanıcılı Yapı:** Admin ve KOBİ rolleriyle ayrıştırılmış demo seviyesinde erişim kontrolü sağlar.
- **Admin Paneli:** Admin kullanıcılarının kayıtlı kullanıcıları listelemesini ve KOBİ kullanıcılarını silmesini sağlar.

## Mimari

```text
SupplyShield/
├── backend/                   # FastAPI - Python
│   ├── app/
│   │   ├── agents/            # 7 uzman ajan
│   │   │   ├── orchestrator_agent.py      # Tüm ajanları koordine eder
│   │   │   ├── inventory_analyst.py       # Stok ve risk analizi
│   │   │   ├── demand_forecast_agent.py   # Talep tahmini
│   │   │   ├── supply_shield_agent.py     # Jeopolitik/tedarik riski
│   │   │   ├── mesh_finder_agent.py       # Mevcut ağdan alternatif tedarikçi
│   │   │   ├── supplier_scout_agent.py    # Yeni tedarikçi adayları
│   │   │   ├── logistics_planner_agent.py # EOQ tabanlı lojistik planı
│   │   │   └── action_composer_agent.py   # Öncelikli aksiyon planı
│   │   ├── api/v1/endpoints/  # REST API endpoint'leri
│   │   ├── models/            # Pydantic veri modelleri
│   │   ├── services/          # Risk hesaplama ve tahmin servisleri
│   │   └── data/              # Mock ürün, tedarikçi ve kullanıcı verileri
│   ├── main.py                # Uygulama giriş noktası
│   └── requirements.txt
│
└── frontend/                  # Next.js 14 - TypeScript
    ├── app/
    │   ├── views/             # Ana ekranlar
    │   │   ├── DashboardView.tsx
    │   │   ├── RiskAnalysisView.tsx
    │   │   ├── InventoryView.tsx
    │   │   ├── LogisticsView.tsx
    │   │   └── AgentsView.tsx
    │   ├── components/        # Yeniden kullanılabilir bileşenler
    │   ├── hooks/             # Veri çekme hook'ları
    │   └── lib/               # API istemcisi, tip tanımları ve auth yardımcıları
    └── package.json
```

## Ajan Akışı

SupplyShield analizleri `OrchestratorAgent` tarafından koordine edilir. Tam analiz akışı şu ajanlardan oluşur:

| Ajan | Görev |
| --- | --- |
| `InventoryAnalystAgent` | Stok durumunu analiz eder, risk skorunu ve risk faktörlerini üretir. |
| `DemandForecastAgent` | 30 günlük talep tahmini ve trend analizi yapar. |
| `SupplyShieldAgent` | Jeopolitik risk, tek tedarikçi bağımlılığı ve kapasite açığını değerlendirir. |
| `MeshFinderAgent` | Mevcut alternatif tedarikçi ağını tarar. |
| `SupplierScoutAgent` | Ürün kategorisine göre yeni tedarikçi adayları önerir. |
| `LogisticsPlannerAgent` | Sipariş miktarı, sevkiyat yöntemi, maliyet ve varış tarihi planlar. |
| `ActionComposerAgent` | Tüm çıktıları öncelikli aksiyon planına dönüştürür. |

## Teknoloji Yığını

| Katman | Teknolojiler |
| --- | --- |
| Backend | Python, FastAPI, Pydantic |
| Frontend | Next.js 14, React, TypeScript |
| Grafik | Recharts |
| Stil | Tailwind CSS, inline component stilleri |
| Mimari | Çok ajanlı orkestrasyon, kural tabanlı risk motoru, EOQ tabanlı lojistik planlama |

## Gereksinimler

- Python 3.10 veya üstü
- Node.js 18 veya üstü
- npm

## Kurulum

Projeyi klonlayın:

```bash
git clone <repo-url>
cd HACKATHON_YapayZekaveTeknolojiAkademisi
```

Backend bağımlılıklarını kurun:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Frontend bağımlılıklarını kurun:

```bash
cd ../frontend
npm install
```

> Not: Proje mock veriyle çalışır. Çalıştırmak için herhangi bir API key girmeniz gerekmez. `.env` dosyası opsiyoneldir.

## Çalıştırma

### Tek komutla çalıştırma

Kök dizinde:

```bash
chmod +x start.sh
./start.sh
```

Bu komut backend ve frontend servislerini birlikte başlatır.

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- API dokümantasyonu: `http://localhost:8000/docs`

### Manuel çalıştırma

İki ayrı terminal açın.

Terminal 1 - Backend:

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

## Demo Hesapları

| Kullanıcı Adı | Şifre | Rol |
| --- | --- | --- |
| `admin` | `admin123` | Admin |
| `kobi1` | `kobi123` | KOBİ |
| `kobi2` | `kobi123` | KOBİ |
| `kobi3` | `kobi123` | KOBİ |

Admin kullanıcı `/admin` paneline yönlendirilir. KOBİ kullanıcıları ana uygulama ekranına erişir.

## Ana Ekranlar

- **Ana Panel:** Ürün sayısı, riskli ürünler, kritik ürünler, ortalama risk skoru ve toplam stok değeri gibi özet metrikleri gösterir.
- **Risk Analizi:** Ürünleri risk skoruna göre listeler ve seçili ürün için detaylı ajan analizi sunar.
- **Stok Sağlığı:** Mevcut stok, yeniden sipariş noktası, kalan stok günü ve durum bilgisini gösterir.
- **Tedarik Planı:** Ürün bazlı sipariş miktarı, sevkiyat yöntemi, maliyet ve tahmini varış tarihini gösterir.
- **Yapay Zeka Ajanları:** 7 ajanlı analiz akışını ürün bazlı çalıştırır ve sonuçları listeler.
- **Admin Paneli:** Admin rolündeki kullanıcının sistem kullanıcılarını yönetmesini sağlar.

## API Endpoint'leri

| Yöntem | Endpoint | Açıklama |
| --- | --- | --- |
| `GET` | `/health` | Servis sağlık kontrolü |
| `POST` | `/api/v1/auth/login` | Kullanıcı girişi, bearer token döner |
| `POST` | `/api/v1/auth/register` | Yeni KOBİ kullanıcısı oluşturur |
| `GET` | `/api/v1/auth/me` | Mevcut kullanıcı bilgisini döner |
| `GET` | `/api/v1/auth/users` | Kullanıcı listesini döner, admin yetkisi ister |
| `DELETE` | `/api/v1/auth/users/{username}` | KOBİ kullanıcısını siler, admin yetkisi ister |
| `GET` | `/api/v1/products` | Ürün listesini döner |
| `GET` | `/api/v1/products/{product_id}` | Tek ürün detayını döner |
| `GET` | `/api/v1/dashboard/summary` | Dashboard özet verilerini döner |
| `GET` | `/api/v1/inventory` | Stok sağlığı listesini döner |
| `GET` | `/api/v1/agent/all-risks` | Tüm ürünlerin risk skorlarını döner |
| `GET` | `/api/v1/agent/product-risk/{product_id}` | Tek ürün için risk detayını döner |
| `POST` | `/api/v1/agent/analyze-product` | Tek ürün için tam ajan analizini çalıştırır |
| `POST` | `/api/v1/agent/generate-action-plan` | Tek ürün için aksiyon planı üretir |

Örnek analiz isteği:

```bash
curl -X POST http://localhost:8000/api/v1/agent/analyze-product \
  -H "Content-Type: application/json" \
  -d '{"product_id":"P001","analysis_depth":"full"}'
```

## Risk Skoru Mantığı

Risk skoru 0-100 aralığında hesaplanır. Yüksek skor daha yüksek tedarik ve stok riski anlamına gelir.

Hesaplamada kullanılan ana faktörler:

- Stok seviyesi ve yeniden sipariş noktasına göre stok kapsama oranı
- Tedarikçi güvenilirliği
- Temin süresi
- Talep değişkenliği
- Ülke ve coğrafi yoğunlaşma riski

Risk seviyeleri:

| Skor | Seviye |
| --- | --- |
| `0 - 24.9` | Low |
| `25 - 49.9` | Medium |
| `50 - 74.9` | High |
| `75 - 100` | Critical |

## Veri Durumu

Bu proje prototip seviyesinde mock veriyle çalışır.

- Ürünler ve tedarikçiler `backend/app/data/mock_products.py` içinde tanımlıdır.
- Demo kullanıcıları `backend/app/data/users.py` içinde tutulur.
- Kullanıcı kayıtları uygulama belleğinde saklanır; servis yeniden başlatıldığında sonradan eklenen kullanıcılar kalıcı olmaz.
- Gerçek ERP, WMS, e-ticaret veya canlı tedarikçi API entegrasyonu henüz bulunmamaktadır.

## Proje Notları

- Ajan motoru şu an kural tabanlı çalışır; harici bir AI API'ye ihtiyaç duymaz.
- Backend konfigürasyonunda `ANTHROPIC_API_KEY` alanı bulunsa da mevcut akışta aktif olarak kullanılmamaktadır.
- Tahmin modeli prototip seviyesindedir; basit trend, stok sinyali ve haftalık sezonsallık yaklaşımı kullanır.
- Mimari, ileride gerçek veri kaynakları ve LLM entegrasyonları eklenebilecek şekilde ayrık modüller halinde tasarlanmıştır.

## Geliştirme Fikirleri

- PostgreSQL veya MongoDB ile kalıcı veri katmanı
- Gerçek ERP/WMS/e-ticaret entegrasyonları
- Canlı tedarikçi ve lojistik API bağlantıları
- Daha gelişmiş zaman serisi tahmin modeli
- Bildirim, alarm ve e-posta uyarı sistemi
- Rol bazlı daha detaylı yetkilendirme
- Gerçek LLM destekli ajan yorumları ve önerileri

