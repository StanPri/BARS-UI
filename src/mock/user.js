const _roles = ['User', 'Manager', 'Security'];
const _types = ['Submitter', 'Recipient', 'Approver', 'Security'];
const r1 = 2, r2 = 1, t = 1;
export const user = {role: [`${_roles[r1]}`, `${_roles[r2]}`], type: _types[t], sam: `SAM : ${_roles[r1]} ${_roles[r2]} ${_types[t]}`};
export const useMock = {
  BARS: false,
  ED: false
}
