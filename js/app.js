const categories = [
  {
    name: "Accounting Services Malaysia",
    summary: "Monthly accounts, bookkeeping, management reports, and SME compliance support.",
    tags: ["Bookkeeping", "Reports", "Compliance"],
    count: "View guide",
    url: "/accounting-services-malaysia",
  },
  {
    name: "Company Secretary Services Malaysia",
    summary: "SSM filings, annual returns, board resolutions, and company maintenance.",
    tags: ["SSM", "Annual returns", "Resolutions"],
    count: "View guide",
    url: "/company-secretary-services-malaysia",
  },
  {
    name: "Tax Agent Malaysia",
    summary: "Corporate tax, SST, tax planning, and annual filing for SMEs.",
    tags: ["Corporate tax", "SST", "Filing"],
    count: "Request quotes",
  },
  {
    name: "Payroll Services Malaysia",
    summary: "Payroll processing, EPF, SOCSO, EIS, PCB, and HR documentation.",
    tags: ["EPF", "SOCSO", "Payslips"],
    count: "View guide",
    url: "/payroll-services-malaysia",
  },
  {
    name: "Digital Marketing Agency Malaysia",
    summary: "SEO, paid ads, social media, content, and campaign management.",
    tags: ["SEO", "Ads", "Social media"],
    count: "View guide",
    url: "/digital-marketing-agency-malaysia",
  },
  {
    name: "Website Design Malaysia",
    summary: "SME websites, landing pages, ecommerce, maintenance, and hosting support.",
    tags: ["Websites", "Landing pages", "Ecommerce"],
    count: "View guide",
    url: "/website-design-services-malaysia",
  },
  {
    name: "SME Business Loan Malaysia",
    summary: "Financing advisory, loan matching, working capital, and grant guidance.",
    tags: ["Working capital", "Loan matching", "Grants"],
    count: "Request quotes",
  },
  {
    name: "HR / Recruitment Services Malaysia",
    summary: "Hiring, HR policies, contracts, onboarding, and workforce support.",
    tags: ["Hiring", "HR policies", "Onboarding"],
    count: "Request quotes",
  },
  {
    name: "Legal Services for SME Malaysia",
    summary: "Contracts, employment matters, licensing, disputes, and advisory.",
    tags: ["Contracts", "Employment", "Advisory"],
    count: "Request quotes",
  },
  {
    name: "IT / POS / CRM Services Malaysia",
    summary: "Business systems, cybersecurity, POS setup, CRM, support, and integrations.",
    tags: ["POS", "CRM", "Support"],
    count: "Request quotes",
  },
];

const providers = [
  {
    name: "Accounting provider",
    category: "Accounting Services Malaysia",
    location: "Kuala Lumpur",
    summary: "Monthly bookkeeping and management accounts for retail, F&B, and service SMEs.",
    verified: true,
    rating: "4.8",
    response: "< 1 day",
    languages: "EN / 中文 / BM",
  },
  {
    name: "Company secretary provider",
    category: "Company Secretary Services Malaysia",
    location: "Selangor",
    summary: "Company incorporation, annual return filing, and statutory compliance support.",
    verified: true,
    rating: "4.7",
    response: "Same day",
    languages: "EN / BM",
  },
  {
    name: "Digital marketing provider",
    category: "Digital Marketing Agency Malaysia",
    location: "Penang",
    summary: "SEO, ads, and content campaigns for local SME enquiries.",
    verified: false,
    rating: "4.5",
    response: "2 days",
    languages: "EN / 中文",
  },
  {
    name: "Payroll provider",
    category: "Payroll Services Malaysia",
    location: "Malaysia-wide",
    summary: "Payroll outsourcing with EPF, SOCSO, EIS, and PCB processing.",
    verified: true,
    rating: "4.9",
    response: "< 1 day",
    languages: "EN / BM",
  },
  {
    name: "Website design provider",
    category: "Website Design Malaysia",
    location: "Johor Bahru",
    summary: "Fast SME websites, landing pages, ecommerce setup, and care plans.",
    verified: false,
    rating: "4.6",
    response: "2 days",
    languages: "EN / 中文",
  },
  {
    name: "IT / POS / CRM provider",
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

    form.addEventListener(
      "invalid",
      () => {
        status.className = "form-status error";
        status.textContent = "Please fill in the required fields, then submit again.";
      },
      true,
    );

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
      status.textContent = "Submitting your request...";

      try {
        const payload = new FormData(form);
        payload.set("page_url", window.location.href);
        payload.set("user_agent", navigator.userAgent);

        const timeout = new Promise((_, reject) => {
          window.setTimeout(() => reject(new Error("Submission timed out")), 15000);
        });

        await Promise.race([
          fetch(form.action, {
            method: "POST",
            body: payload,
            mode: "no-cors",
          }),
          timeout,
        ]);

        form.reset();
        status.textContent = form.dataset.success || "Thanks. Your request has been received.";
        status.classList.add("success");
      } catch (error) {
        status.textContent = "Submission failed. Please try again later.";
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
        <a class="category-card" href="${category.url || "#quote"}">
          <div>
            <h3>${category.name}</h3>
            <p>${category.summary}</p>
          </div>
          <strong class="category-count">${category.count}</strong>
          <div class="category-meta">
            ${category.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
        </a>
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
              ${provider.verified ? `<span class="verified">Profile checked</span>` : ""}
            </div>
            <p>${provider.summary}</p>
            <div class="provider-signals">
              <span>${provider.location}</span>
              <span>${provider.response}</span>
              <span>${provider.languages}</span>
            </div>
            <div class="provider-meta">
              <span class="pill">${provider.category.replace(" Malaysia", "")}</span>
              <span class="pill">Can receive enquiries</span>
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
