export function getTenant() {
  return localStorage.getItem('tenant_id');
}

export function setTenant(id) {
  localStorage.setItem('tenant_id', id);
}
