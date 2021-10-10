class StarRater extends HTMLElement {
    constructor() {
        super()

        this.build()
    }

    build() {
        const shadow = this.attachShadow({ mode: 'open'})

        shadow.appendChild(this.styles())

        const rater = this.createRater()
        this.stars = this.createStars()

        this.stars.forEach(star => rater.appendChild(star))

        shadow.appendChild(rater)

    } 

    createRater() {
        const rater = document.createElement('div')
        rater.classList.add('star-rater')

        return rater
    }

    createStars() {
        const createStar = (_, id) => {
            const star = document.createElement('span')
            star.classList.add('star')
            star.setAttribute('data-value', Number(id) + 1)
            star.innerHTML = '&#9733;'

            star.addEventListener('click', this.setRating.bind(this))
            star.addEventListener('mouseover', this.ratingHover.bind(this))

            return star
        }

        return Array.from({ length: 5}, createStar)
    }

    setRating(e) {
        this.setAttribute('data-rating', e.currentTarget.getAttribute('data-value'))
    }

    ratingHover(e) {
        this.currentRatingValue = e.currentTarget.getAttribute('data-value')
        this.hightLightRating()
    }

    hightLightRating(e) {
        this.stars.forEach(star => {
            star.style.color = this.currentRatingValue >= star.getAttribute('data-value') ? 'yellow' : 'gray'
        })
    }

    styles() {
        const style = document.createElement('style')
        style.textContent = `
            .star {
                font-size: 5rem;
                color: grey;
                cursor: pointer;
            }
        `

        return style
    }
}

customElements.define('star-rater', StarRater)