import axios from 'axios';

export interface University {
  alpha_two_code: string;
  country: string;
  'state-province': string | null;
  domains: string[];
  name: string;
  web_pages: string[];
}

export interface UniversitySearchParams {
  name?: string;
  country?: string;
}

const API_BASE_URL = 'http://universities.hipolabs.com';

export class UniversityApiService {
  private static instance: UniversityApiService;

  private constructor() {}

  public static getInstance(): UniversityApiService {
    if (!UniversityApiService.instance) {
      UniversityApiService.instance = new UniversityApiService();
    }
    return UniversityApiService.instance;
  }

  async searchUniversities(params: UniversitySearchParams): Promise<University[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.name) {
        queryParams.append('name', params.name);
      }
      
      if (params.country) {
        queryParams.append('country', params.country);
      }

      const url = `${API_BASE_URL}/search?${queryParams.toString()}`;
      console.log('Fetching from API:', url);
      
      const response = await axios.get<University[]>(url);
      console.log('API Response:', response.data.length, 'universities found');
      
      return response.data;
    } catch (error) {
      console.error('Error fetching universities:', error);
      throw new Error('Failed to fetch universities from API');
    }
  }

  async getAllUniversities(): Promise<University[]> {
    try {
      const response = await axios.get<University[]>(`${API_BASE_URL}/search`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all universities:', error);
      throw new Error('Failed to fetch universities');
    }
  }

  async getUniversitiesByCountry(country: string): Promise<University[]> {
    return this.searchUniversities({ country });
  }

  async getUniversitiesByName(name: string): Promise<University[]> {
    return this.searchUniversities({ name });
  }
}

export default UniversityApiService.getInstance(); 