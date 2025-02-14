const domains = {
   google: ['gmail.com', 'googlemail.com'],

   // List of domains used by iCloud
   iCloud: ['icloud.com', 'me.com'],

   // List of domains used by Outlook.com and its predecessors
   // This list is likely incomplete.
   // Partial reference:
   // https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
   outlook: [
      'hotmail.at',
      'hotmail.be',
      'hotmail.ca',
      'hotmail.cl',
      'hotmail.co.il',
      'hotmail.co.nz',
      'hotmail.co.th',
      'hotmail.co.uk',
      'hotmail.com',
      'hotmail.com.ar',
      'hotmail.com.au',
      'hotmail.com.br',
      'hotmail.com.gr',
      'hotmail.com.mx',
      'hotmail.com.pe',
      'hotmail.com.tr',
      'hotmail.com.vn',
      'hotmail.cz',
      'hotmail.de',
      'hotmail.dk',
      'hotmail.es',
      'hotmail.fr',
      'hotmail.hu',
      'hotmail.id',
      'hotmail.ie',
      'hotmail.in',
      'hotmail.it',
      'hotmail.jp',
      'hotmail.kr',
      'hotmail.lv',
      'hotmail.my',
      'hotmail.ph',
      'hotmail.pt',
      'hotmail.sa',
      'hotmail.sg',
      'hotmail.sk',
      'live.be',
      'live.co.uk',
      'live.com',
      'live.com.ar',
      'live.com.mx',
      'live.de',
      'live.es',
      'live.eu',
      'live.fr',
      'live.it',
      'live.nl',
      'msn.com',
      'outlook.at',
      'outlook.be',
      'outlook.cl',
      'outlook.co.il',
      'outlook.co.nz',
      'outlook.co.th',
      'outlook.com',
      'outlook.com.ar',
      'outlook.com.au',
      'outlook.com.br',
      'outlook.com.gr',
      'outlook.com.pe',
      'outlook.com.tr',
      'outlook.com.vn',
      'outlook.cz',
      'outlook.de',
      'outlook.dk',
      'outlook.es',
      'outlook.fr',
      'outlook.hu',
      'outlook.id',
      'outlook.ie',
      'outlook.in',
      'outlook.it',
      'outlook.jp',
      'outlook.kr',
      'outlook.lv',
      'outlook.my',
      'outlook.ph',
      'outlook.pt',
      'outlook.sa',
      'outlook.sg',
      'outlook.sk',
      'passport.com',
   ],

   // List of domains used by Yahoo Mail
   // This list is likely incomplete
   yahoo: [
      'rocketmail.com',
      'yahoo.ca',
      'yahoo.co.uk',
      'yahoo.com',
      'yahoo.de',
      'yahoo.fr',
      'yahoo.in',
      'yahoo.it',
      'ymail.com',
   ],

   // List of domains used by yandex.ru
   yandex: ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru'],
}

/**
 * Normalize an email. Trim, lowercase and normalized base on domains
 * (google, icloud, outlook, yahoo, yandex)
 *
 * @param email The email to normalize
 * @returns Either the normalized email or null if it can't be normalized
 */
export function normalizeEmail(email: string): string | null {
   /* Trim */

   const trimmed = email.trim()

   if (!trimmed) {
      return null
   }

   /* Split */

   const parts = trimmed.split('@')

   if (parts.length !== 2) {
      return null
   }

   /* Lowercase */

   const user = parts[0].toLowerCase()
   const domain = parts[1].toLowerCase()

   if (!user || !domain) {
      return null
   }

   /* Domain rules */

   if (domains.google.includes(domain)) {
      return normalizeGmail([user, domain])
   }

   if (domains.iCloud.includes(domain)) {
      return normalizeiCloud([user, domain])
   }

   if (domains.outlook.includes(domain)) {
      return normalizeOutlook([user, domain])
   }

   if (domains.yahoo.includes(domain)) {
      return normalizeYahoo([user, domain])
   }

   if (domains.yandex.includes(domain)) {
      return normalizeYandex([user, domain])
   }

   return parts.join('@')
}

// ========== Domain Helpers ==========

function normalizeGmail(parts: [string, string]): string | null {
   let [user, domain] = parts

   // Remove sub address
   user = user.split('+')[0]

   // Remove dots
   user = user.replace(/\.+/g, '')

   if (!user.length) {
      return null
   }

   // normalize domain
   domain = 'gmail.com'

   return [user, domain].join('@')
}

function normalizeiCloud(parts: [string, string]): string | null {
   /* eslint-disable-next-line prefer-const */
   let [user, domain] = parts

   // Remove sub address
   user = user.split('+')[0]

   if (!user.length) {
      return null
   }

   return [user, domain].join('@')
}

function normalizeOutlook(parts: [string, string]): string | null {
   /* eslint-disable-next-line prefer-const */
   let [user, domain] = parts

   // Remove sub address
   user = user.split('+')[0]

   if (!user.length) {
      return null
   }

   // lowercase user
   user = user.toLowerCase()

   return [user, domain].join('@')
}

function normalizeYahoo(parts: [string, string]): string | null {
   /* eslint-disable-next-line prefer-const */
   let [user, domain] = parts

   // Remove sub address
   const userComponents = user.split('-')
   user = userComponents.length > 1 ? userComponents.slice(0, -1).join('-') : userComponents[0]

   if (!user.length) {
      return null
   }

   return [user, domain].join('@')
}

function normalizeYandex(parts: [string, string]): string | null {
   let [user, domain] = parts

   // lowercase user
   user = user.toLowerCase()

   // normalize domain
   domain = 'yandex.ru'

   return [user, domain].join('@')
}
