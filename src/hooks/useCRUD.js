import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export function useCRUD(singular, plural) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/${plural}`);
      if (response.ok) {
        const result = await response.json();
        // API returns { status, data: [...] } - extract the array
        setItems(Array.isArray(result) ? result : result.data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${plural}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Create new item
  const create = async (data, isFormData = false) => {
    try {
      const headers = { ...getAuthHeaders() };
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const options = {
        method: 'POST',
        headers,
        body: isFormData ? data : JSON.stringify(data),
      };

      const response = await fetch(`${BASE_URL}/${singular}`, options);
      
      if (response.ok) {
        await fetchItems(); // Refresh the list
        return { success: true };
      } else {
        const error = await response.text();
        console.error(`Error creating ${singular}:`, error);
        return { success: false, error };
      }
    } catch (error) {
      console.error(`Error creating ${singular}:`, error);
      return { success: false, error: error.message };
    }
  };

  // Update item
  const update = async (data, isFormData = false) => {
    try {
      const headers = { ...getAuthHeaders() };
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const options = {
        method: 'PUT',
        headers,
        body: isFormData ? data : JSON.stringify(data),
      };

      const response = await fetch(`${BASE_URL}/${singular}`, options);
      
      if (response.ok) {
        await fetchItems(); // Refresh the list
        return { success: true };
      } else {
        const error = await response.text();
        console.error(`Error updating ${singular}:`, error);
        return { success: false, error };
      }
    } catch (error) {
      console.error(`Error updating ${singular}:`, error);
      return { success: false, error: error.message };
    }
  };

  // Delete item
  const remove = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${singular}?`)) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${singular}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await fetchItems(); // Refresh the list
        return { success: true };
      } else {
        const error = await response.text();
        console.error(`Error deleting ${singular}:`, error);
        return { success: false, error };
      }
    } catch (error) {
      console.error(`Error deleting ${singular}:`, error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    create,
    update,
    remove,
    refresh: fetchItems
  };
}