'use client';

/**
 * Composant de tracking pour Expedia Group Travel Shops
 * Intègre les 3 balises requises pour le tracking des commissions
 * 
 * À utiliser dans la page principale (page.tsx) tout à la fin
 */

export function TrackingScripts() {
  // Remplacez ces valeurs par vos vrais identifiants depuis Expedia
  const SHOP_ID = 'YOUR_SHOP_ID'; // Ex: VRAX12345
  const GTM_CONTAINER_ID = 'GTM-EXPEDIA_SHOP'; // Ex: GTM-XXXXXX

  return (
    <>
      {/* 
       * BALISE 1 : Expedia Meta Tags 
       * Ces métadonnées sont utilisées par Expedia pour identifier votre shop
       */}
      <meta name="expedia-partner" content="VRAX_TRAVEL_SHOP" />
      <meta property="expedia:shop_id" content={SHOP_ID} />

      {/* 
       * BALISE 2 : Google Tag Manager Script
       * Script de tracking principal pour suivre les clics et conversions
       */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+s:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
          `
        }}
      />

      {/* 
       * BALISE 3 : NoScript Fallback
       * Permet le tracking même si JavaScript est désactivé
       */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
