import szymon from '../../src/assets/images/blogAuthors/Szymon.jpg'
import brainsAndBeards from '../../src/assets/images/blogAuthors/bb.png'
import blazej from '../../src/assets/images/blogAuthors/blazej.jpeg'
import ilya from '../../src/assets/images/blogAuthors/ilya.jpg'
import lukasz from '../../src/assets/images/blogAuthors/lukasz.jpeg'
import marek from '../../src/assets/images/blogAuthors/marek.jpeg'
import mihaly from '../../src/assets/images/blogAuthors/mihaly.jpeg'
import natalia from '../../src/assets/images/blogAuthors/natalia.png'
import patryk from '../../src/assets/images/blogAuthors/patryk.jpeg'
import wojtek from '../../src/assets/images/blogAuthors/wojtek.jpeg'

export const blogAuthors = {
  'Natalia Majkowska-Stewart': { image: natalia, title: 'React and React Native developer' },
  'Marek Waligórski': { image: marek, title: 'Software Developer' },
  'Wojciech Ogrodowczyk': { image: wojtek, title: 'Software developer' },
  'Patryk Peszko': { image: patryk, title: 'Co Founder' },
  'Mihály Bezzeg': { image: mihaly, title: 'Mobile developer' },
  'Brains&Beards': { image: brainsAndBeards, title: 'Mobile application development studio' },
  'Szymon Koper': { image: szymon, title: 'React Native developer' },
  'Błażej Lewandowski': { image: blazej, title: 'React Native developer' },
  'Łukasz Wolski': { image: lukasz, title: 'React Native developer' },
  'Ilya Kushner': { image: ilya, title: 'React Native developer' }
} as const
