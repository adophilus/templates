export type TQuote = {
  content: string
  author: string
}

export const quotes: TQuote[] = [
  {
    content:
      'Do the best you can until you know better. Then when you know better, do better.',
    author: 'Maya Angelou'
  },
  {
    content:
      'There is nothing noble in being superior to your fellow man; true nobility is being superior to your former self.',
    author: 'Ernest Hemingway'
  },
  {
    content:
      'Stay afraid, but do it anyway. What’s important is the action. You don’t have to wait to be confident. Just do it and eventually the confidence will follow.',
    author: 'Carrie Fisher'
  },
  {
    content:
      'One can choose to go back toward safety or forward toward growth. Growth must be chosen again and again; fear must be overcome again and again.',
    author: 'Abraham Maslow'
  },
  {
    content: 'We can’t become what we need to be by remaining what we are.',
    author: 'Oprah Winfrey'
  },
  {
    content:
      'When we’re growing up, there are all sorts of people telling us what to do when really what we need is space to work out who to be.',
    author: 'Elliot Page'
  },
  {
    content: 'If there is no struggle, there is no progress.',
    author: 'Frederick Douglass'
  },
  {
    content:
      'Permit yourself to change your mind when something is no longer working for you.',
    author: 'Nedra Glover Tawwab'
  },
  {
    content:
      'Be not afraid of growing slowly; be afraid only of standing still.',
    author: 'Chinese Proverb'
  },
  {
    content:
      'Though no one can go back and make a brand new start, anyone can start from now and make a brand new ending.',
    author: 'Carl Bard'
  }
]

export const getRandomQuote = () =>
  quotes[Math.floor(Math.random() * quotes.length)]
