
document.addEventListener("DOMContentLoaded", () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".card, .skill-card, .passion-card, .event-card")

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("animate-fadeInUp")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() 

  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.5)"
    } else {
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
    }
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const nom = document.getElementById("nom").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()
      const rgpd = document.getElementById("rgpd").checked

      if (nom === "" || email === "" || message === "") {
        e.preventDefault()
        alert("Veuillez remplir tous les champs obligatoires.")
        return false
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        e.preventDefault()
        alert("Veuillez entrer une adresse email valide.")
        return false
      }

      if (!rgpd) {
        e.preventDefault()
        alert("Veuillez accepter les conditions d'utilisation des données.")
        return false
      }

      alert("Merci pour votre message ! Je vous répondrai dans les plus brefs délais.")
    })
  }

  const progressBars = document.querySelectorAll(".progress-bar")
  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (barTop < windowHeight - 50) {
        const width = bar.style.width
        bar.style.width = "0%"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      }
    })
  }

  if (progressBars.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target
            const width = bar.getAttribute("style").match(/width:\s*(\d+%)/)
            if (width) {
              bar.style.width = "0%"
              setTimeout(() => {
                bar.style.width = width[1]
              }, 200)
            }
            observer.unobserve(bar)
          }
        })
      },
      { threshold: 0.5 },
    )

    progressBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")
  const bootstrap = window.bootstrap 

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  console.log("Portfolio Ayoub Boujneh - Site chargé avec succès !")
})
