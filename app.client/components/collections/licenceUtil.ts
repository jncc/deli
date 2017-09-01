
export type Licence =
  | 'none'
  | 'oglv3'

export function getLicenceDetails(licence: Licence) {

  switch (licence) {
    case 'none' : return {
      name:  'None',
      image: 'none.png',
      description: 'No licence information was found',
      url: ''
    }
    case 'oglv3' : return {
      name: 'Open Government Licence v3',
      image: 'ogl.png',
      description: 'Open Government Licence v3',
      url: 'http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
    }
  }
}

export function getLicenceDetailsFromUseConstraints(s: string) {

  let licence: Licence = 'none'

  if (s.indexOf('Open Government Licence v3') !== -1) {
    licence = 'oglv3'
  }

  return getLicenceDetails(licence);
}

