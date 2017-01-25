import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const records = [
  {
        section_1_name: 'Chuck Norris',
        section_1_company_name: 'California Department of Technology',
        section_1_work_phone: '1111111111',
        section_1_cell_phone: '2222222222',
        section_1_license: 'E1111111111',
        section_1_company_address: '10860 Gold Center Dr, Rancho Cordova, CA 95670',
        section_1_division: 'Applications',
        section_1_unit: 'BPAZZZ',
        section_1_request_date: '2017-01-26',
        section_1_supervisor_name: 'Sylvester Stallone',
        section_1_supervisor_phone: '3333333333',
        section_2_reason: '2',
        section_2_hours: '3',
        section_2_areas: [
          '2'
        ],
        section_3_access_levels: [
          '2'
        ],
        section_3_issue_date: '2017-01-19',
        section_3_expiration_date: '2017-01-20',
        section_3_keycard: '3',
        section_3_admin_name: 'Al Pacino',
        terms_name: 'Chuck Norris'
      },
      {
        section_1_name: 'Jean-Claude Van Damme',
        section_1_company_name: 'California Department of Technology',
        section_1_work_phone: '(111)1111111',
        section_1_cell_phone: '(222)2222222',
        section_1_license: 'E777777777777',
        section_1_company_address: '10860 Gold Center Dr, Rancho Cordova, CA 95670',
        section_1_division: 'Applications',
        section_1_unit: 'BPAZZZ',
        section_1_request_date: '2017-02-12',
        section_1_supervisor_name: 'Arnold Schwarzenegger',
        section_1_supervisor_phone: '(333)3333333',
        section_2_reason: '1',
        section_2_hours: '2',
        section_2_areas: [
          '1'
        ],
        section_3_access_levels: [
          '3'
        ],
        section_3_issue_date: '2017-01-09',
        section_3_expiration_date: '2017-01-20',
        section_3_keycard: '456',
        section_3_admin_name: 'Bruce Willis',
        terms_name: 'Jean-Claude Van Damme'
      },
      {
        section_1_name: 'Jason Statham',
        section_1_company_name: 'California Department of Technology',
        section_1_work_phone: '(111)111-11-11',
        section_1_cell_phone: '(222)222-22-22',
        section_1_license: 'E888888888',
        section_1_company_address: '10860 Gold Center Dr, Rancho Cordova, CA 95670',
        section_1_division: 'Applications',
        section_1_unit: 'BPAZZZ',
        section_1_request_date: '2017-03-23',
        section_1_supervisor_name: 'Jet Li',
        section_1_supervisor_phone: '(333)333-33-33',
        section_2_reason: '2',
        section_2_hours: '1',
        section_2_areas: [
          '1'
        ],
        section_3_access_levels: [
          '1'
        ],
        section_3_issue_date: '2017-03-17',
        section_3_expiration_date: '2017-04-21',
        section_3_admin_name: 'Mickey Rourke',
        terms_name: 'Jason Statham',
        section_3_keycard: '357'
      },
      {
        section_1_name: 'Clint Eastwood',
        section_1_company_name: 'California Department of Technology',
        section_1_work_phone: '(000)000-00-00',
        section_1_cell_phone: '(777)777-77-77',
        section_1_license: 'E999999999',
        section_1_company_address: '10860 Gold Center Dr, Rancho Cordova, CA 95670',
        section_1_division: 'Applications',
        section_1_unit: 'BPAZZZ',
        section_1_request_date: '2017-03-23',
        section_1_supervisor_name: 'Tom Hanks',
        section_1_supervisor_phone: '(555)555-55-55',
        section_2_reason: '1',
        section_2_hours: '2',
        section_2_areas: [
          '3'
        ],
        section_3_access_levels: [
          '3'
        ],
        section_3_issue_date: '2017-01-06',
        section_3_expiration_date: '2017-03-07',
        section_3_admin_name: 'Robert De Niro',
        terms_name: 'Clint Eastwood',
        section_3_keycard: '999'
      },
      {
        section_1_name: 'George Clooney',
        section_1_company_name: 'California Department of Technology',
        section_1_work_phone: '(444)444-44-44',
        section_1_cell_phone: '(222)333-44-55',
        section_1_license: 'E000000000',
        section_1_company_address: '10860 Gold Center Dr, Rancho Cordova, CA 95670',
        section_1_division: 'Applications',
        section_1_unit: 'BPAZZZ',
        section_1_request_date: '2017-05-17',
        section_1_supervisor_name: 'Matt Damon',
        section_1_supervisor_phone: '(555)555-55-55',
        section_2_reason: '3',
        section_2_hours: '1',
        section_2_areas: [
          '2'
        ],
        section_3_access_levels: [
          '1'
        ],
        section_3_issue_date: '2017-05-25',
        section_3_expiration_date: '2017-05-15',
        section_3_admin_name: 'Kevin Spacey',
        terms_name: 'George Clooney',
        section_3_keycard: '789'
      }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (record) => {
  return replaceAll(record.title, ' ', '-');
};

class RecordApi {
  static getAllRecords() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], records));
      }, delay);
    });
  }

  static saveRecords(record) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (record.section_1_name) {
          const existingRecordIndex = records.findIndex(a => a.section_1_name == record.section_1_name);
          records.splice(existingRecordIndex, 1, record);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new records in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          records.push(record);
        }

        resolve(Object.assign({}, record));
      }, delay);
    });
  }

  static deleteRecord(recordId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfrecordToDelete = records.findIndex(record => {
          record.recordId == recordId;
        });
        records.splice(indexOfrecordToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecordApi;
