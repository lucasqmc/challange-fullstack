import axios from 'axios'

const ClinicService = {
  getClinics: function() {
    return axios({
      method: 'GET',
      url: process.env.REACT_APP_API_ENDPOINT + '/clinics'
    })
  },

  createClinic: function(clinicData: any) {
    return axios({
      method: 'POST',
      url: process.env.REACT_APP_API_ENDPOINT + '/clinics',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(clinicData)
    })
  }
};

export default ClinicService;