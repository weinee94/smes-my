const categories = [
  {
    name: "Accounting Services Malaysia",
    summary: "Monthly accounts, bookkeeping, management reports, and SME compliance support.",
    tags: ["High intent", "Recurring", "KL/Selangor"],
    count: "24 providers",
  },
  {
    name: "Company Secretary Services Malaysia",
    summary: "SSM filings, annual returns, board resolutions, and company maintenance.",
    tags: ["Compliance", "B2B", "Retainer"],
    count: "18 providers",
  },
  {
    name: "Tax Agent Malaysia",
    summary: "Corporate tax, SST, tax planning, and annual filing for SMEs.",
    tags: ["Seasonal", "Trusted", "Lead-ready"],
    count: "12 providers",
  },
  {
    name: "Payroll Services Malaysia",
    summary: "Payroll processing, EPF, SOCSO, EIS, PCB, and HR documentation.",
    tags: ["Monthly", "HR", "Automation"],
    count: "15 providers",
  },
  {
    name: "Digital Marketing Agency Malaysia",
    summary: "SEO, paid ads, social media, content, and campaign management.",
    tags: ["Growth", "Competitive", "High value"],
    count: "21 providers",
  },
  {
    name: "Website Design Malaysia",
    summary: "SME websites, landing pages, ecommerce, maintenance, and hosting support.",
    tags: ["Project", "SME digitalisation", "Quote-based"],
    count: "19 providers",
  },
  {
    name: "SME Business Loan Malaysia",
    summary: "Financing advisory, loan matching, working capital, and grant guidance.",
    tags: ["Finance", "Urgent", "Qualified leads"],
    count: "9 providers",
  },
  {
    name: "HR / Recruitment Services Malaysia",
    summary: "Hiring, HR policies, contracts, onboarding, and workforce support.",
    tags: ["People", "SME ops", "Retainer"],
    count: "11 providers",
  },
  {
    name: "Legal Services for SME Malaysia",
    summary: "Contracts, employment matters, licensing, disputes, and advisory.",
    tags: ["Trust", "Specialist", "High value"],
    count: "8 providers",
  },
  {
    name: "IT / POS / CRM Services Malaysia",
    summary: "Business systems, cybersecurity, POS setup, CRM, support, and integrations.",
    tags: ["Digital", "Operations", "Vendor match"],
    count: "16 providers",
  },
];

const providers = [
  {
    name: "KL SME Accounts",
    category: "Accounting Services Malaysia",
    location: "Kuala Lumpur",
    summary: "Monthly bookkeeping and management accounts for retail, F&B, and service SMEs.",
    verified: true,
    rating: "4.8",
    response: "< 1 day",
    languages: "EN / 中文 / BM",
  },
  {
    name: "Selangor Corporate Sec",
    category: "Company Secretary Services Malaysia",
    location: "Selangor",
    summary: "Company incorporation, annual return filing, and statutory compliance support.",
    verified: true,
    rating: "4.7",
    response: "Same day",
    languages: "EN / BM",
  },
  {
    name: "Penang Growth Studio",
    category: "Digital Marketing Agency Malaysia",
    location: "Penang",
    summary: "SEO, ads, and content campaigns for local SME lead generation.",
    verified: false,
    rating: "4.5",
    response: "2 days",
    languages: "EN / 中文",
  },
  {
    name: "PayrollWorks MY",
    category: "Payroll Services Malaysia",
    location: "Malaysia-wide",
    summary: "Payroll outsourcing with EPF, SOCSO, EIS, and PCB processing.",
    verified: true,
    rating: "4.9",
    response: "< 1 day",
    languages: "EN / BM",
  },
  {
    name: "SME Web Lab",
    category: "Website Design Malaysia",
    location: "Johor Bahru",
    summary: "Fast SME websites, landing pages, ecommerce setup, and care plans.",
    verified: false,
    rating: "4.6",
    response: "2 days",
    languages: "EN / 中文",
  },
  {
    name: "OpsTech POS",
    category: "IT / POS / CRM Services Malaysia",
    location: "Klang Valley",
    summary: "POS, CRM, helpdesk, and business software implementation for SMEs.",
    verified: true,
    rating: "4.8",
    response: "< 1 day",
    languages: "EN / BM",
  },
];

const categoryGrid = document.querySelector("#categoryGrid");
const providerGrid = document.querySelector("#providerGrid");
const providerFilter = document.querySelector("#providerFilter");
const providerSearch = document.querySelector("#providerSearch");

function setupLeadForms() {
  document.querySelectorAll(".js-lead-form").forEach((form) => {
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.className = "form-status";

      if (form.action.includes("REPLACE_WITH_DEPLOYMENT_ID")) {
        status.textContent = "Google Sheets endpoint is not configured yet.";
        status.classList.add("error");
        return;
      }

      const button = form.querySelector("button[type='submit']");
      button.disabled = true;
      button.textContent = "Sending...";
      status.textContent = "";

      try {
        const payload = new FormData(form);
        payload.set("page_url", window.location.href);
        payload.set("user_agent", navigator.userAgent);

        await fetch(form.action, {
          method: "POST",
          body: payload,
          mode: "no-cors",
        });

        form.reset();
        status.textContent = form.dataset.success || "Thanks. Your request has been received.";
        status.classList.add("success");
      } catch (error) {
        status.textContent = "Submission failed. Please try again or contact hello@smes.com.my.";
        status.classList.add("error");
      } finally {
        button.disabled = false;
        button.textContent = form.dataset.buttonLabel || button.dataset.originalLabel || "Submit";
      }
    });

    const button = form.querySelector("button[type='submit']");
    if (button) {
      button.dataset.originalLabel = button.textContent;
      form.dataset.buttonLabel = button.textContent;
    }
  });
}

function renderCategories() {
  categoryGrid.innerHTML = categories
    .map(
      (category) => `
        <article class="category-card">
          <div>
            <h3>${category.name}</h3>
            <p>${category.summary}</p>
          </div>
          <strong class="category-count">${category.count}</strong>
          <div class="category-meta">
            ${category.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function populateProviderFilter() {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name.replace(" Malaysia", "");
    providerFilter.append(option);
  });
}

function renderProviders() {
  const filter = providerFilter.value;
  const query = providerSearch.value.trim().toLowerCase();
  const filtered = providers.filter((provider) => {
    const matchesFilter = filter === "All" || provider.category === filter;
    const content = `${provider.name} ${provider.category} ${provider.location} ${provider.summary}`.toLowerCase();
    return matchesFilter && content.includes(query);
  });

  providerGrid.innerHTML =
    filtered
      .map(
        (provider) => `
          <article class="provider-card">
            <div class="provider-top">
              <div>
                <h3>${provider.name}</h3>
                <p>${provider.category}</p>
              </div>
              ${provider.verified ? `<span class="verified">Verified</span>` : ""}
            </div>
            <p>${provider.summary}</p>
            <div class="provider-signals">
              <span>Rating ${provider.rating}</span>
              <span>${provider.response}</span>
              <span>${provider.languages}</span>
            </div>
            <div class="provider-meta">
              <span class="pill">${provider.location}</span>
              <span class="pill">Accepting leads</span>
            </div>
          </article>
        `,
      )
      .join("") || `<p>No providers match this search yet.</p>`;
}

renderCategories();
populateProviderFilter();
renderProviders();
setupLeadForms();

providerFilter.addEventListener("change", renderProviders);
providerSearch.addEventListener("input", renderProviders);
