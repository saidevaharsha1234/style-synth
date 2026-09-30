/* =========================================
   REAL AI STYLE ANALYSIS
   ADD THIS AT THE VERY END OF SCRIPT.JS
========================================= */

window.analyzeStyle = async function () {

  const input = document.getElementById("bodyPhoto");
  const preview = document.getElementById("bodyPreview");
  const profile = document.getElementById("styleProfile");

  if (!input || !input.files || !input.files[0]) {

    showToast("Please upload a full-body photo first.");

    return;
  }

  const file = input.files[0];

  /*
    Basic image validation
  */

  if (!file.type.startsWith("image/")) {

    showToast("Please choose an image file.");

    return;
  }

  /*
    Keep uploads reasonably sized.
    This also makes the analysis faster.
  */

  if (file.size > 10 * 1024 * 1024) {

    showToast("Please choose an image smaller than 10 MB.");

    return;
  }


  /*
    Show loading state inside the EXISTING
    style profile area.
  */

  profile.innerHTML = `

    <div class="profile-placeholder">

      <div class="profile-symbol">✦</div>

      <h3>Style Synth is analyzing...</h3>

      <p>
        Examining visible styling details,
        outfit coordination, colors and
        hairstyle possibilities.
      </p>

      <div style="
        margin-top:20px;
        width:100%;
        height:3px;
        background:rgba(199,163,90,0.12);
        border-radius:20px;
        overflow:hidden;
      ">

        <div style="
          width:45%;
          height:100%;
          background:#c7a35a;
          animation:styleSynthLoading 1.5s infinite;
        "></div>

      </div>

    </div>

  `;


  try {

    /*
      Convert image into Base64.
    */

    const imageData = await fileToDataURL(file);


    /*
      IMPORTANT:
      This URL must point to YOUR backend.

      Example:

      https://your-style-synth-api.onrender.com/api/analyze-style

      Do NOT put your OpenAI API key here.
    */

    const API_URL =
      "https://YOUR-BACKEND-URL.com/api/analyze-style";


    const response = await fetch(API_URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        image: imageData

      })

    });


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "The AI analysis failed."
      );

    }


    if (!data.analysis) {

      throw new Error(
        "The AI returned an empty analysis."
      );

    }


    /*
      Display AI results in the EXISTING
      Style Profile section.
    */

    renderAIStyleProfile(data.analysis);


    showToast("Your AI style profile is ready.");

  }

  catch (error) {

    console.error(
      "Style Synth AI Error:",
      error
    );


    profile.innerHTML = `

      <div class="profile-placeholder">

        <div class="profile-symbol">!</div>

        <h3>Analysis couldn't be completed</h3>

        <p>
          Please check your connection and try
          again.
        </p>

        <button
          class="gold-button"
          onclick="analyzeStyle()"
          style="margin-top:18px;"
        >
          Try Again
        </button>

      </div>

    `;


    showToast(
      "AI analysis failed. Please try again."
    );

  }

};


/* =========================================
   IMAGE → BASE64
========================================= */

function fileToDataURL(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();


    reader.onload = () => {

      resolve(reader.result);

    };


    reader.onerror = () => {

      reject(
        new Error("Unable to read image.")
      );

    };


    reader.readAsDataURL(file);

  });

}


/* =========================================
   RENDER AI STYLE PROFILE
========================================= */

function renderAIStyleProfile(analysis) {

  const profile =
    document.getElementById("styleProfile");


  const faceShape =
    analysis.face_shape || "Not clearly visible";

  const skinTone =
    analysis.skin_tone_appearance ||
    "Not clearly determined";

  const hair =
    analysis.hair_and_hairstyle ||
    "No specific recommendation";

  const palette =
    analysis.recommended_colors ||
    "Neutral and coordinated colors";

  const styleDirection =
    analysis.style_direction ||
    "Balanced personal style";

  const outfit =
    analysis.outfit_recommendations ||
    "Choose coordinated pieces from your wardrobe";

  const accessories =
    analysis.accessories ||
    "Minimal coordinated accessories";

  const neckline =
    analysis.neckline_and_collar ||
    "Clean, versatile necklines";

  const improvement =
    analysis.current_outfit_improvements ||
    "Keep the outfit coordinated and balanced";


  profile.innerHTML = `

    <p class="eyebrow">
      AI STYLE ANALYSIS
    </p>

    <h3>
      Your Style Profile
    </h3>

    <p style="
      color:#98948c;
      font-size:12px;
      line-height:1.6;
      margin-top:8px;
    ">
      Style recommendations based on the visible
      features of your uploaded photo.
    </p>


    <div class="profile-results">


      <div class="profile-result">

        <label>
          Face shape
        </label>

        <strong>
          ${escapeHTML(faceShape)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Skin-tone appearance
        </label>

        <strong>
          ${escapeHTML(skinTone)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Hair & hairstyle
        </label>

        <strong>
          ${escapeHTML(hair)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Recommended colors
        </label>

        <strong>
          ${escapeHTML(palette)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Style direction
        </label>

        <strong>
          ${escapeHTML(styleDirection)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Necklines & collars
        </label>

        <strong>
          ${escapeHTML(neckline)}
        </strong>

      </div>


      <div class="profile-result">

        <label>
          Accessories
        </label>

        <strong>
          ${escapeHTML(accessories)}
        </strong>

      </div>


    </div>


    <div style="
      margin-top:20px;
      padding:17px;
      background:rgba(199,163,90,0.05);
      border:1px solid rgba(199,163,90,0.15);
      border-radius:13px;
    ">

      <p class="eyebrow">
        OUTFIT RECOMMENDATIONS
      </p>

      <p style="
        color:#98948c;
        font-size:12px;
        line-height:1.7;
      ">
        ${escapeHTML(outfit)}
      </p>

    </div>


    <div style="
      margin-top:15px;
      padding:17px;
      background:rgba(199,163,90,0.05);
      border:1px solid rgba(199,163,90,0.15);
      border-radius:13px;
    ">

      <p class="eyebrow">
        ELEVATE YOUR CURRENT OUTFIT
      </p>

      <p style="
        color:#98948c;
        font-size:12px;
        line-height:1.7;
      ">
        ${escapeHTML(improvement)}
      </p>

    </div>


    <div style="
      margin-top:15px;
      padding:17px;
      background:rgba(199,163,90,0.05);
      border:1px solid rgba(199,163,90,0.15);
      border-radius:13px;
    ">

      <p class="eyebrow">
        HAIRSTYLE DIRECTION
      </p>

      <p style="
        color:#98948c;
        font-size:12px;
        line-height:1.7;
      ">
        ${escapeHTML(hair)}
      </p>

    </div>

  `;

}


/* =========================================
   SMALL LOADING ANIMATION
   DOES NOT CHANGE YOUR EXISTING UI
========================================= */

if (!document.getElementById("styleSynthAIAnimation")) {

  const style =
    document.createElement("style");

  style.id =
    "styleSynthAIAnimation";

  style.textContent = `

    @keyframes styleSynthLoading {

      0% {
        transform:translateX(-100%);
      }

      100% {
        transform:translateX(250%);
      }

    }

  `;

  document.head.appendChild(style);

}
