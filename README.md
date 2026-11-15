# लूडो रेस — ऑनलाइन वेबसाइट

गेम में क्या-क्या है:

- **कंप्यूटर के साथ:** अकेले 1, 2 या 3 बॉट के साथ खेलें।
- **साथ बैठकर:** एक ही फ़ोन या कंप्यूटर पर 2 से 4 लोग बारी-बारी से खेलें।
- **ऑनलाइन दोस्त:** Facebook, Google या मेहमान बनकर लॉगिन करें।
  - रूम बनाएँ और इनवाइट लिंक (कॉपी या WhatsApp) भेजें, या रूम कोड से जुड़ें।
  - "अभी ऑनलाइन" लिस्ट में दिख रहे किसी भी खिलाड़ी को "खेलने बुलाएँ" दबाकर रिक्वेस्ट भेजें। उसे स्वीकार/मना करने का पॉपअप दिखेगा।
  - खाली जगह पर कंप्यूटर भी खेल सकता है।
  - कोई खिलाड़ी 30 सेकंड तक चाल न चले तो उसकी चाल अपने आप चल दी जाती है।
- **मोड:** क्लासिक, रेस 2 मिनट, रेस 10 मिनट। लाइव रैंकिंग और नतीजे की स्क्रीन भी है।

## एक बार का सेटअप (Terminal)

```bash
# 1) Firebase टूल इंस्टॉल करें और लॉगिन करें
npm install -g firebase-tools
firebase login

# 2) इस फ़ोल्डर में जाएँ (zip को Downloads में unzip करने के बाद)
cd ~/Downloads/ludo-online

# 3) नया Firebase प्रोजेक्ट बनाएँ (नाम दुनिया में यूनिक होना चाहिए)
PROJECT=ludo-race-$RANDOM
echo $PROJECT            # यह नाम नोट कर लें
firebase projects:create $PROJECT --display-name "Ludo Race"
firebase use $PROJECT
firebase apps:create web "Ludo Web" --project $PROJECT

# 4) Realtime Database चालू करें
firebase init database
#   - "set it up now?" पूछे तो → Yes, location कोई भी चुनें
#   - rules फ़ाइल का नाम → Enter
#   - "database.rules.json already exists. Overwrite?" → No

# 5) वेबसाइट और database rules अपलोड करें
firebase deploy --only hosting,database
#   आपकी वेबसाइट:  https://$PROJECT.web.app
```

## लॉगिन चालू करना (Firebase Console, 2 मिनट)

Facebook, Google और मेहमान लॉगिन Terminal से चालू नहीं होते, यह Firebase की वेबसाइट पर करना पड़ता है। यह पेज सीधे खोलें:

```bash
open "https://console.firebase.google.com/project/$PROJECT/authentication/providers"   # Mac
# Windows: start "..."   Linux: xdg-open "..."
```

"Get started" दबाएँ, फिर ये तीन चालू करें:

1. **Anonymous** (मेहमान) → Enable → Save
2. **Google** → Enable → support email चुनें → Save
3. **Facebook** → Enable। इसके लिए App ID और App Secret चाहिए (नीचे देखें)। यहाँ दिखने वाला **OAuth redirect URI** कॉपी कर लें।

## Facebook ऐप बनाना (developers.facebook.com)

1. https://developers.facebook.com/apps/creation/ पर **Create App** → "Authenticate and request data from users with Facebook Login"।
2. **App settings → Basic** से **App ID** और **App Secret** कॉपी करके Firebase के Facebook वाले खाने में डालें।
3. उसी पेज पर **Privacy Policy URL** में डालें: `https://$PROJECT.web.app/privacy.html` और **User data deletion** में भी यही URL।
4. **Facebook Login → Settings → Valid OAuth Redirect URIs** में Firebase वाला redirect URI डालें (`https://$PROJECT.firebaseapp.com/__/auth/handler`)।
5. ऐप को **Live** मोड में करें, ताकि हर कोई लॉगिन कर सके।

## GitHub पर कोड रखना (वैकल्पिक)

```bash
git init && git add . && git commit -m "Ludo Race online"
gh repo create ludo-race --public --source=. --push
```

## बाद में बदलाव अपलोड करना

```bash
firebase deploy --only hosting
```

## ध्यान रखें

- Firebase का मुफ़्त प्लान (Spark) एक साथ लगभग 100 कनेक्शन तक चलता है। इससे ज़्यादा भीड़ हो तो Blaze प्लान लेना होगा।
- ऑनलाइन गेम में रेस का टाइमर और बॉट की चालें होस्ट के फ़ोन/कंप्यूटर से चलती हैं। होस्ट गेम बीच में बंद कर दे तो रूम रुक जाएगा।
