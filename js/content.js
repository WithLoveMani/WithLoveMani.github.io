/* ==========================================================================
   EDIT ME. Everything Manisha will want to change lives in this file.
   Leave a value as "" and that piece simply stays hidden on the site.
   ========================================================================== */
window.SITE = {
  handle: "@withlovemaniiiii",
  location: "Toronto, Canada",

  // Where the contact form sends mail.
  email: "withlovemaniiiii@gmail.com",

  // The "Send email" button posts here. Paste your Google Apps Script web app link
  // (it looks like https://script.google.com/macros/s/XXXX/exec). Setup steps are in
  // creator-site-setup/SETUP.md. Left empty, the button opens the visitor's own email app instead.
  // (A Formspree link also works here if you ever prefer that.)
  formEndpoint: "",

  socials: {
    instagram: "https://www.instagram.com/withlovemaniiiii/",
    instagramDM: "https://ig.me/m/withlovemaniiiii",   // the "DM on Instagram" button
    youtube: "https://www.youtube.com/@manishainCanada",
    tiktok: ""    // add your TikTok profile URL here and the icon appears
  },

  // Lines that rotate under the hero headline.
  rotating: [
    "Relatable Reels with a little heart.",
    "Brand stories that feel like a friend's recommendation.",
    "Honest picks, pretty frames, zero stiff scripts."
  ],

  /* Selected work. Add as many cards as you like, one block per video or post.

     HOW TO ADD A REAL VIDEO OR POST (use ONE of these per card):
       youtube:   paste the video link, e.g. "https://www.youtube.com/watch?v=abc123XYZ_0"
                  (Shorts links work too). Its cover image is picked up automatically.
       instagram: paste the post or reel link, e.g. "https://www.instagram.com/reel/Cxxxxxxxxxx/"
                  (Instagram: open the post, tap the three dots, Copy link). Plays inside the site.
                  Your Instagram account must be public.
       video:     a file you uploaded, e.g. "assets/reel-01.mp4". Keep it short and under 25 MB.
                  Add  wide: true  if it is a landscape video. This is the only option that is
                  guaranteed to play inside the page. You can set it together with `instagram`:
                  the video plays on the site and an "Open on Instagram" button sits below it.
     With none of these, the card just links out to `url`.
     Every card that plays in a pop-up also gets an "Open on Instagram / YouTube" button.

     Covers: the Instagram cards use cover images saved in assets/covers/ (named after the reel code).
     Instagram's own preview inside the pop-up is controlled by Instagram and may send viewers to
     instagram.com when they press play.

     Optional on every card:
       thumb:  your own cover image, e.g. "assets/reel-01.jpg" (4:5 or 9:16 works best).
               Instagram covers cannot be pulled automatically, so save a screenshot of the
               reel cover and point to it here.
       metric: e.g. "212K views" (only add numbers you can back up).
       tone:   maple, ink, blush, butter, sage or maple2 (colour used when there is no thumb).

     EXAMPLE (copy this block, fill it in, and put it at the top of the list):
       {
         format: "Brand collab", title: "Skincare Routine with Brand X",
         blurb: "A 30 second Reel for their spring launch.",
         platform: "Instagram", instagram: "https://www.instagram.com/reel/Cxxxxxxxxxx/",
         thumb: "assets/skincare-cover.jpg", metric: "84K views", tone: "blush"
       },
  */
  // Order matters: the first six show on the site by default (a mix of food, lifestyle and fitness),
  // and "Show all" reveals the rest. Filter chips are built from each card's `format`.
  work: [
    {
      format: "Lifestyle",
      title: "Relief, not a breakdown",
      blurb: "“Wishing that the day feels like relief instead of a breakdown.”",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DZ99cmqR57N/",
      thumb: "assets/covers/DZ99cmqR57N.jpg", metric: "", tone: "maple"
    },
    {
      format: "Food",
      title: "Worth the 75 day wait",
      blurb: "A Marathi thali reward in Toronto, with Kolhapuri pomfret and solkadhi.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DeOzQWjxq6p/",
      thumb: "assets/covers/DeOzQWjxq6p.jpg", metric: "", tone: "butter"
    },
    {
      format: "Fitness",
      title: "Toned arms in 2.5 months",
      blurb: "The routine and habits behind it: strength training, protein, daily steps and water.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DeJ4q_cRE0R/",
      thumb: "assets/covers/DeJ4q_cRE0R.jpg", metric: "", tone: "sage"
    },
    {
      format: "Lifestyle",
      title: "It truly makes me happy",
      blurb: "Self-love, softly. Back to being happy.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DeUTltExJoi/",
      thumb: "assets/covers/DeUTltExJoi.jpg", metric: "", tone: "blush"
    },
    {
      format: "Food",
      title: "Small wins matter",
      blurb: "A baking Reel about celebrating the little things.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DWhax0dCjoX/",
      thumb: "assets/covers/DWhax0dCjoX.jpg", metric: "", tone: "maple2"
    },
    {
      format: "Fitness",
      title: "Simple abs workout",
      blurb: "4 sets of 12 each side, slow and light, core engaged.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DeIodUEq5Qd/",
      thumb: "assets/covers/DeIodUEq5Qd.jpg", metric: "", tone: "ink"
    },
    {
      format: "Fitness",
      title: "Art of consistency",
      blurb: "Routines, steps and showing up for yourself.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DeDE9uDqNp-/",
      thumb: "assets/covers/DeDE9uDqNp-.jpg", metric: "", tone: "sage"
    },
    {
      format: "Lifestyle",
      title: "Keep going",
      blurb: "A small, warm reminder for the days that feel heavy.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DXBKyBiDSlp/",
      thumb: "assets/covers/DXBKyBiDSlp.jpg", metric: "", tone: "blush"
    },
    {
      format: "Lifestyle",
      title: "A crispy Diet Coke paglu",
      blurb: "Just girly things, done with a wink.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/Def4upZxSpM/",
      thumb: "assets/covers/Def4upZxSpM.jpg", metric: "", tone: "maple2"
    },
    {
      format: "Lifestyle",
      title: "Dil toh bacha hai ji",
      blurb: "A playful POV about the inner child that never quite grows up.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/Dd6YiGhRNv2/",
      thumb: "assets/covers/Dd6YiGhRNv2.jpg", metric: "", tone: "butter"
    },
    {
      format: "Lifestyle",
      title: "my hahahahaha",
      blurb: "Best friends, girly things and a lot of giggles.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DejpL9PxO7U/",
      thumb: "assets/covers/DejpL9PxO7U.jpg", metric: "", tone: "maple"
    },
    {
      format: "Lifestyle",
      title: "Silly me, but...",
      blurb: "Imperfect, emotional and happy anyway.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DefwEHMKXrw/",
      thumb: "assets/covers/DefwEHMKXrw.jpg", metric: "", tone: "ink"
    },
    {
      format: "Lifestyle",
      title: "Camera roll nostalgia",
      blurb: "Old photos and the many versions of us.",
      platform: "Instagram",
      instagram: "https://www.instagram.com/reel/DXEz_UOkfZi/",
      thumb: "assets/covers/DXEz_UOkfZi.jpg", metric: "", tone: "butter"
    },
    {
      format: "YouTube",
      title: "On YouTube",
      blurb: "128 videos and counting, from life in Canada to everything in between.",
      platform: "YouTube",
      url: "https://www.youtube.com/@manishainCanada",
      thumb: "", metric: "1.29K subscribers", tone: "ink"
    }
  ]
};
