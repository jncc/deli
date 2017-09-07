
export type Licence =
  | 'none'
  | 'oglv3'
  | 'ncgl'

export function getLicenceDetails(licence: Licence) {

  switch (licence) {
    case 'none' : return {
      name:  'None',
      image: 'none.png',
      url: ''
    }
    case 'oglv3' : return {
      name: 'Open Government Licence v3',
      image: 'ogl.png',
      url: 'http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'
    }
    case 'ncgl' : return {
      name: 'Non-Commercial Government Licence',
      image: '',
      url: 'http://www.nationalarchives.gov.uk/doc/non-commercial-government-licence/non-commercial-government-licence.htm'
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

