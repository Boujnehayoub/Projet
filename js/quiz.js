const quizData = {
  answers: {
    q1: "b", 
    q2: "b", 
    q3: "c", 
    q4: "a", 
    q5: "b", 
    q6: "b", 
    q7: "b", 
    q8: "b", 
    q9: "b", 
    q10: "b", 
    q11: "b", 
    q12: "b", 
  },
  explanations: {
    q1: "Python est le langage le plus populaire pour l'analyse de données grâce à ses bibliothèques comme Pandas, NumPy et Scikit-learn.",
    q2: "SQL (Structured Query Language) est un langage standard pour interroger et manipuler les bases de données relationnelles.",
    q3: "Pandas est une bibliothèque Python puissante pour la manipulation et l'analyse de données structurées.",
    q4: "HTML signifie HyperText Markup Language, c'est le langage de balisage standard pour créer des pages web.",
    q5: "CSS (Cascading Style Sheets) permet de définir le style visuel des pages web : couleurs, polices, mise en page.",
    q6: "MongoDB est une base de données NoSQL orientée documents, idéale pour les données non structurées.",
    q7: "Git est un système de contrôle de version distribué qui permet de suivre les modifications du code source.",
    q8: "Postman est un outil populaire pour tester et documenter les API REST.",
    q9: "Docker permet de conteneuriser des applications pour les déployer de manière isolée et portable.",
    q10: "Bootstrap est un framework CSS qui facilite la création de sites web responsive et modernes.",
    q11: "Le Machine Learning permet aux machines d'apprendre à partir de données sans être explicitement programmées.",
    q12: 'Scrum est une méthode agile qui organise le travail en cycles courts appelés "sprints" (généralement 2-4 semaines).',
  },
  correctTexts: {
    q1: "Python",
    q2: "Un langage de requête pour bases de données",
    q3: "Pandas",
    q4: "HyperText Markup Language",
    q5: "Styliser les pages web",
    q6: "NoSQL",
    q7: "Un système de contrôle de version",
    q8: "Postman",
    q9: "Conteneuriser des applications",
    q10: "Bootstrap",
    q11: "L'apprentissage automatique par les machines",
    q12: "Scrum",
  },
}


let quizSubmitted = false


function calculateScore() {
  let score = 0
  const totalQuestions = Object.keys(quizData.answers).length

  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = "q" + i
    const selectedAnswer = document.querySelector('input[name="' + questionName + '"]:checked')

    if (selectedAnswer && selectedAnswer.value === quizData.answers[questionName]) {
      score++
    }
  }

  return score
}


function displayResults(score) {
  const totalQuestions = Object.keys(quizData.answers).length
  const percentage = Math.round((score / totalQuestions) * 100)


  document.getElementById("scoreDisplay").textContent = score + "/" + totalQuestions


  let message = ""
  if (percentage >= 90) {
    message = "Excellent ! Vous êtes un expert en technologie !"
  } else if (percentage >= 70) {
    message = "Très bien ! Vous avez de bonnes connaissances."
  } else if (percentage >= 50) {
    message = "Pas mal ! Continuez à apprendre."
  } else {
    message = "Il y a encore du travail, mais ne vous découragez pas !"
  }
  document.getElementById("scoreMessage").textContent = message

  
  let correctAnswersHTML = ""
  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = "q" + i
    correctAnswersHTML += '<div class="mb-3 p-3 rounded" style="background: rgba(13, 110, 253, 0.1);">'
    correctAnswersHTML += "<strong>Question " + i + " :</strong> " + quizData.correctTexts[questionName]
    correctAnswersHTML += '<br><small class="text-secondary">' + quizData.explanations[questionName] + "</small>"
    correctAnswersHTML += "</div>"
  }
  document.getElementById("correctAnswers").innerHTML = correctAnswersHTML

  
  document.getElementById("quiz-results").style.display = "block"
}


function markAnswers() {
  const totalQuestions = Object.keys(quizData.answers).length

  for (let i = 1; i <= totalQuestions; i++) {
    const questionName = "q" + i
    const questionCard = document.querySelector('.question-card[data-question="' + i + '"]')
    const options = questionCard.querySelectorAll(".form-check")
    const selectedAnswer = document.querySelector('input[name="' + questionName + '"]:checked')

    options.forEach((option) => {
      const input = option.querySelector("input")
      option.classList.remove("correct-answer", "wrong-answer")

      
      if (input.value === quizData.answers[questionName]) {
        option.classList.add("correct-answer")
      }

      
      if (selectedAnswer && selectedAnswer.value !== quizData.answers[questionName] && input === selectedAnswer) {
        option.classList.add("wrong-answer")
      }
    })

    
    const inputs = questionCard.querySelectorAll("input")
    inputs.forEach((input) => {
      input.disabled = true
    })
  }
}


function resetQuiz() {
  const form = document.getElementById("quizForm")
  form.reset()

  
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    input.disabled = false
  })

  const options = form.querySelectorAll(".form-check")
  options.forEach((option) => {
    option.classList.remove("correct-answer", "wrong-answer")
  })

  document.getElementById("quiz-results").style.display = "none"

  document.getElementById("submitQuiz").style.display = "inline-block"
  document.getElementById("resetQuiz").style.display = "none"

  quizSubmitted = false

  document.querySelector(".quiz-container").scrollIntoView({ behavior: "smooth" })
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("submitQuiz").addEventListener("click", () => {
    if (quizSubmitted) return

    const totalQuestions = Object.keys(quizData.answers).length
    let allAnswered = true

    for (let i = 1; i <= totalQuestions; i++) {
      const questionName = "q" + i
      const selectedAnswer = document.querySelector('input[name="' + questionName + '"]:checked')
      if (!selectedAnswer) {
        allAnswered = false
        break
      }
    }

    if (!allAnswered) {
      alert("Veuillez répondre à toutes les questions avant de valider.")
      return
    }

    quizSubmitted = true

    const score = calculateScore()
    markAnswers()
    displayResults(score)

    document.getElementById("submitQuiz").style.display = "none"
    document.getElementById("resetQuiz").style.display = "inline-block"

    document.getElementById("quiz-results").scrollIntoView({ behavior: "smooth" })
  })

  document.getElementById("resetQuiz").addEventListener("click", resetQuiz)
})
