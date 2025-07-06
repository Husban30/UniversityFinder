import { useState } from 'react';
import { University, UniversitySearchParams } from '../types/university';
import universityApi from '../services/universityApi';

export const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUniversities = async (params: UniversitySearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await universityApi.searchUniversities(params);
      setUniversities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByCountry = async (country: string) => {
    await searchUniversities({ country });
  };

  const searchByName = async (name: string) => {
    await searchUniversities({ name });
  };

  const clearResults = () => {
    setUniversities([]);
    setError(null);
  };

  return {
    universities,
    loading,
    error,
    searchUniversities,
    searchByCountry,
    searchByName,
    clearResults,
  };
}; 