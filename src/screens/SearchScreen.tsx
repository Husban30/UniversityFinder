import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Linking,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import universityApi, { University } from '../services/universityApi';
// Removed CountryFlag import as it's causing issues

export const SearchScreen: React.FC = () => {
  const [searchType, setSearchType] = useState<'name' | 'country'>('name');
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    setCityFilter('');
    setShowCityFilter(false);
    setSortOrder(null);
    setShowHistory(false);
    
    // Add to search history
    const trimmedQuery = searchQuery.trim();
    setSearchHistory(prev => {
      const newHistory = [trimmedQuery, ...prev.filter(item => item !== trimmedQuery)].slice(0, 5);
      return newHistory;
    });
    
    // Reset animations for new search
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    try {
      let results: University[] = [];
      let searchTerm = searchQuery.trim();
      
      if (searchType === 'name') {
        // Handle common university abbreviations for more precise searches
        const universityAbbreviations: { [key: string]: string } = {
          'mit': 'Massachusetts Institute of Technology',
          'harvard': 'Harvard University',
          'stanford': 'Stanford University',
          'berkeley': 'University of California Berkeley',
          'oxford': 'University of Oxford',
          'cambridge': 'University of Cambridge',
          'imperial': 'Imperial College London',
          'ucl': 'University College London',
          'lse': 'London School of Economics',
          'toronto': 'University of Toronto',
          'mcgill': 'McGill University',
          'ubc': 'University of British Columbia',
          'melbourne': 'University of Melbourne',
          'sydney': 'University of Sydney',
          'anu': 'Australian National University',
          'tum': 'Technical University of Munich',
          'lmu': 'Ludwig Maximilian University of Munich',
          'heidelberg': 'Heidelberg University',
          'eth': 'ETH Zurich',
          'epfl': 'EPFL',
          'iit': 'Indian Institute of Technology',
          'iitb': 'Indian Institute of Technology Bombay',
          'iitd': 'Indian Institute of Technology Delhi',
          'du': 'University of Delhi',
          'jnu': 'Jawaharlal Nehru University'
        };
        
        const normalizedSearch = searchTerm.toLowerCase();
        const mappedUniversity = universityAbbreviations[normalizedSearch];
        
        if (mappedUniversity) {
          searchTerm = mappedUniversity;
        }
        
        results = await universityApi.getUniversitiesByName(searchTerm);
      } else {
        // Handle common country abbreviations
        const countryMappings: { [key: string]: string } = {
          'us': 'United States',
          'usa': 'United States',
          'uk': 'United Kingdom',
          'gb': 'United Kingdom',
          'england': 'United Kingdom',
          'ca': 'Canada',
          'au': 'Australia',
          'de': 'Germany',
          'fr': 'France',
          'it': 'Italy',
          'es': 'Spain',
          'nl': 'Netherlands',
          'se': 'Sweden',
          'no': 'Norway',
          'dk': 'Denmark',
          'fi': 'Finland',
          'ch': 'Switzerland',
          'at': 'Austria',
          'be': 'Belgium',
          'pt': 'Portugal',
          'ie': 'Ireland',
          'nz': 'New Zealand',
          'jp': 'Japan',
          'kr': 'South Korea',
          'cn': 'China',
          'in': 'India',
          'br': 'Brazil',
          'mx': 'Mexico',
          'ar': 'Argentina',
          'cl': 'Chile',
          'co': 'Colombia',
          'pe': 'Peru',
          'za': 'South Africa',
          'eg': 'Egypt',
          'ng': 'Nigeria',
          'ke': 'Kenya',
          'gh': 'Ghana',
          'ma': 'Morocco',
          'sa': 'Saudi Arabia',
          'ae': 'United Arab Emirates',
          'uae': 'United Arab Emirates',
          'tr': 'Turkey',
          'pl': 'Poland',
          'cz': 'Czech Republic',
          'hu': 'Hungary',
          'ro': 'Romania',
          'bg': 'Bulgaria',
          'hr': 'Croatia',
          'si': 'Slovenia',
          'sk': 'Slovakia',
          'lt': 'Lithuania',
          'lv': 'Latvia',
          'ee': 'Estonia',
          'ru': 'Russia',
          'ua': 'Ukraine',
          'by': 'Belarus',
          'kz': 'Kazakhstan',
          'uz': 'Uzbekistan',
          'ge': 'Georgia',
          'am': 'Armenia',
          'az': 'Azerbaijan',
          'il': 'Israel',
          'jo': 'Jordan',
          'lb': 'Lebanon',
          'sy': 'Syria',
          'iq': 'Iraq',
          'ir': 'Iran',
          'pk': 'Pakistan',
          'bd': 'Bangladesh',
          'lk': 'Sri Lanka',
          'np': 'Nepal',
          'bt': 'Bhutan',
          'mm': 'Myanmar',
          'th': 'Thailand',
          'vn': 'Vietnam',
          'la': 'Laos',
          'kh': 'Cambodia',
          'my': 'Malaysia',
          'sg': 'Singapore',
          'id': 'Indonesia',
          'ph': 'Philippines',
          'mn': 'Mongolia',
          'kg': 'Kyrgyzstan',
          'tj': 'Tajikistan',
          'tm': 'Turkmenistan',
          'af': 'Afghanistan',
          'ye': 'Yemen',
          'om': 'Oman',
          'qa': 'Qatar',
          'kw': 'Kuwait',
          'bh': 'Bahrain'
        };
        
        const normalizedSearch = searchTerm.toLowerCase();
        const mappedCountry = countryMappings[normalizedSearch];
        
        if (mappedCountry) {
          searchTerm = mappedCountry;
        }
        
        results = await universityApi.getUniversitiesByCountry(searchTerm);
        // Extract unique states for country searches
        const states = [...new Set(results
          .map(uni => uni['state-province'])
          .filter((state): state is string => state !== null && state.trim() !== '')
        )].sort();
        setAvailableCities(states);
        setShowCityFilter(states.length > 0);
      }
      
      setUniversities(results);
      
      // Trigger animation when results load
      if (results.length > 0) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search universities. Please try again.');
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCityFilter = (city: string) => {
    setCityFilter(city);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const getUniversityImage = (universityName: string, country: string) => {
    // Map universities to their image URLs
    const universityImages: { [key: string]: string } = {
      'Massachusetts Institute of Technology': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
      'Harvard University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      'Stanford University': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      'University of Oxford': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
      'University of Cambridge': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      'Imperial College London': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
      'ETH Zurich': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      'University of Toronto': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
      'University of Melbourne': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop',
      'Technical University of Munich': 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop',
    };

    // Try to find exact match first
    if (universityImages[universityName]) {
      return universityImages[universityName];
    }

    // Fallback to country-based images
    const countryImages: { [key: string]: string } = {
      'United States': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop',
      'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop',
      'Canada': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop',
      'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=200&fit=crop',
      'Germany': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop',
      'Switzerland': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop',
      'India': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop',
      'France': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=200&fit=crop',
      'Italy': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=200&fit=crop',
      'Spain': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=200&fit=crop',
    };

    return countryImages[country] || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop';
  };

  const clearFilters = () => {
    setCityFilter('');
    setSortOrder(null);
  };

  const validateSearchQuery = (query: string): boolean => {
    return query.trim().length >= 2;
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Filter and sort universities
  const filteredAndSortedUniversities = React.useMemo(() => {
    let filtered = universities;

    // Apply city filter
    if (cityFilter) {
      filtered = filtered.filter(uni => 
        uni['state-province'] && uni['state-province'].toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    }

    return filtered;
  }, [universities, cityFilter, sortOrder]);

  // Memoize the header to prevent re-renders
  const headerComponent = React.useMemo(() => {
    const renderHeader = () => (
      <LinearGradient
        colors={['#90D5FF', '#57B9FF']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="school" size={32} color="#FFFFFF" style={styles.titleIcon} />
            <Text style={styles.title}>University Finder</Text>
            <Text style={styles.subtitle}>Discover universities around the world</Text>
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, searchType === 'name' && styles.activeTab]}
              onPress={() => setSearchType('name')}
            >
              <Ionicons 
                name="search" 
                size={18} 
                color={searchType === 'name' ? '#517891' : '#999'} 
              />
              <Text style={[styles.tabText, searchType === 'name' && styles.activeTabText]}>
                By Name
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.tab, searchType === 'country' && styles.activeTab]}
              onPress={() => setSearchType('country')}
            >
              <Ionicons 
                name="globe" 
                size={18} 
                color={searchType === 'country' ? '#517891' : '#999'} 
              />
              <Text style={[styles.tabText, searchType === 'country' && styles.activeTabText]}>
                By Country
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={searchType === 'name' ? 'Search by university name...' : 'Search by country...'}
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setError(null); // Clear error when user types
                  setShowHistory(text.length > 0 && searchHistory.length > 0);
                }}
                onFocus={() => {
                  if (searchHistory.length > 0) {
                    setShowHistory(true);
                  }
                }}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => {
                  setSearchQuery('');
                  setShowHistory(false);
                }}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <View style={styles.historyContainer}>
              {searchHistory.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.historyItem}
                  onPress={() => {
                    setSearchQuery(item);
                    setShowHistory(false);
                    handleSearch();
                  }}
                >
                  <Ionicons name="time-outline" size={16} color="#999" />
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Filter Controls */}
          {showCityFilter && (
            <View style={styles.filterContainer}>
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Filter by State:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
                  <TouchableOpacity
                    style={[styles.cityChip, !cityFilter && styles.activeCityChip]}
                    onPress={() => handleCityFilter('')}
                  >
                    <Text style={[styles.cityChipText, !cityFilter && styles.activeCityChipText]}>
                      All States
                    </Text>
                  </TouchableOpacity>
                  {availableCities.map((city, index) => {
                    const chipAnim = new Animated.Value(0);
                    
                    // Start animation with delay
                    setTimeout(() => {
                      Animated.timing(chipAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                      }).start();
                    }, index * 50);
                    
                    return (
                      <Animated.View
                        key={index}
                        style={{
                          opacity: chipAnim,
                        }}
                      >
                        <TouchableOpacity
                          style={[styles.cityChip, cityFilter === city && styles.activeCityChip]}
                          onPress={() => handleCityFilter(city)}
                        >
                          <Text style={[styles.cityChipText, cityFilter === city && styles.activeCityChipText]}>
                            {city}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
                </ScrollView>
              </View>
              
              <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Sort by Name:</Text>
                <View style={styles.sortContainer}>
                  <TouchableOpacity
                    style={[styles.sortButton, sortOrder === 'asc' && styles.activeSortButton]}
                    onPress={() => handleSort('asc')}
                  >
                    <Ionicons name="arrow-up" size={16} color={sortOrder === 'asc' ? '#517891' : '#999'} />
                    <Text style={[styles.sortButtonText, sortOrder === 'asc' && styles.activeSortButtonText]}>
                      A-Z
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.sortButton, sortOrder === 'desc' && styles.activeSortButton]}
                    onPress={() => handleSort('desc')}
                  >
                    <Ionicons name="arrow-down" size={16} color={sortOrder === 'desc' ? '#517891' : '#999'} />
                    <Text style={[styles.sortButtonText, sortOrder === 'desc' && styles.activeSortButtonText]}>
                      Z-A
                    </Text>
                  </TouchableOpacity>
                  {(cityFilter || sortOrder) && (
                    <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                      <Ionicons name="close" size={16} color="#999" />
                      <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    );
    return renderHeader();
  }, [searchType, searchQuery, handleSearch]);

  const handleWebsitePress = (url: string) => {
    Linking.openURL(url);
  };

  const getCountryFlag = (countryCode: string) => {
    const flagEmojis: { [key: string]: string } = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'CA': '🇨🇦', 'AU': '🇦🇺', 'DE': '🇩🇪', 'CH': '🇨🇭', 'IN': '🇮🇳', 'FR': '🇫🇷', 'IT': '🇮🇹', 'ES': '🇪🇸',
      'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴', 'DK': '🇩🇰', 'FI': '🇫🇮', 'AT': '🇦🇹', 'BE': '🇧🇪', 'PT': '🇵🇹', 'IE': '🇮🇪', 'NZ': '🇳🇿',
      'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'BR': '🇧🇷', 'MX': '🇲🇽', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪', 'ZA': '🇿🇦',
      'EG': '🇪🇬', 'NG': '🇳🇬', 'KE': '🇰🇪', 'GH': '🇬🇭', 'MA': '🇲🇦', 'SA': '🇸🇦', 'AE': '🇦🇪', 'TR': '🇹🇷', 'PL': '🇵🇱', 'CZ': '🇨🇿',
      'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷', 'SI': '🇸🇮', 'SK': '🇸🇰', 'LT': '🇱🇹', 'LV': '🇱🇻', 'EE': '🇪🇪', 'RU': '🇷🇺',
      'UA': '🇺🇦', 'BY': '🇧🇾', 'KZ': '🇰🇿', 'UZ': '🇺🇿', 'GE': '🇬🇪', 'AM': '🇦🇲', 'AZ': '🇦🇿', 'IL': '🇮🇱', 'JO': '🇯🇴', 'LB': '🇱🇧',
      'SY': '🇸🇾', 'IQ': '🇮🇶', 'IR': '🇮🇷', 'PK': '🇵🇰', 'BD': '🇧🇩', 'LK': '🇱🇰', 'NP': '🇳🇵', 'BT': '🇧🇹', 'MM': '🇲🇲', 'TH': '🇹🇭',
      'VN': '🇻🇳', 'LA': '🇱🇦', 'KH': '🇰🇭', 'MY': '🇲🇾', 'SG': '🇸🇬', 'ID': '🇮🇩', 'PH': '🇵🇭', 'MN': '🇲🇳', 'KG': '🇰🇬', 'TJ': '🇹🇯',
      'TM': '🇹🇲', 'AF': '🇦🇫', 'YE': '🇾🇪', 'OM': '🇴🇲', 'QA': '🇶🇦', 'KW': '🇰🇼', 'BH': '🇧🇭'
    };
    return flagEmojis[countryCode.toUpperCase()] || '🏳️';
  };

  const renderUniversity = ({ item, index }: any) => {
    const cardHeight = 160; // Reduced card height for better spacing
    const cardTop = index * cardHeight;
    
    // Create smoother scroll-based animations
    const inputRange = [
      cardTop - 300, // Start animation closer to view
      cardTop - 100, // Card starts appearing
      cardTop + 50,  // Card is fully visible
      cardTop + 150  // Card is well into view
    ];
    
    // Only animate when scrolling - toned down animations
    const opacity = isScrolling ? scrollY.interpolate({
      inputRange,
      outputRange: [0.7, 0.9, 1, 1], // Less dramatic fade
      extrapolate: 'clamp',
    }) : new Animated.Value(1);
    
    const translateY = isScrolling ? scrollY.interpolate({
      inputRange,
      outputRange: [15, 8, 0, 0], // Much smaller movement
      extrapolate: 'clamp',
    }) : new Animated.Value(0);
    
    const scale = isScrolling ? scrollY.interpolate({
      inputRange,
      outputRange: [0.98, 0.99, 1, 1], // Very subtle scale
      extrapolate: 'clamp',
    }) : new Animated.Value(1);

    return (
      <Animated.View 
        style={[
          styles.card,
          {
            opacity,
            transform: [
              { translateY },
              { scale }
            ],
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.universityInfo}>
            <Text style={styles.universityName} numberOfLines={2}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={14} color="#666" />
              <Text style={styles.universityLocation}>
                {item['state-province'] ? `${item['state-province']}, ` : ''}{item.country}
              </Text>
            </View>
          </View>
          <View style={styles.flagContainer}>
            <Text style={styles.flag}>{getCountryFlag(item.alpha_two_code)}</Text>
            <Text style={styles.flag}>{item.alpha_two_code}</Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.domainContainer}>
            <Ionicons name="mail" size={16} color="#77B1D4" />
            <Text style={styles.universityDomain}>{item.domains[0]}</Text>
          </View>
          {item.web_pages && item.web_pages.length > 0 && (
            <TouchableOpacity 
              style={styles.websiteButton} 
              onPress={() => handleWebsitePress(item.web_pages[0])}
            >
              <Ionicons name="globe-outline" size={16} color="#77B1D4" />
              <Text style={styles.websiteText}>Visit Website</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent" 
        translucent={true}
      />
      
      <FlatList
        data={filteredAndSortedUniversities}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderUniversity}
        ListHeaderComponent={headerComponent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { 
            useNativeDriver: false,
            listener: (event) => {
              // Set scrolling state to true
              setIsScrolling(true);
              
              // Clear existing timeout
              if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
              }
              
              // Set timeout to stop scrolling state after 150ms of no scroll
              scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
              }, 150);
            }
          }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#57B9FF" />
              <Text style={styles.loadingText}>Searching universities...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={80} color="#FF6B6B" />
              <Text style={styles.errorTitle}>Search Error</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="school-outline" size={80} color="#CCC" />
              <Text style={styles.emptyTitle}>No universities found</Text>
              <Text style={styles.emptySubtitle}>
                {searchType === 'name' 
                  ? 'Try searching for universities like "MIT", "Harvard", or "Oxford"'
                  : 'Try searching for countries like "India", "Germany", or "United States"'
                }
              </Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0, // Remove container padding, let gradient handle it
  },
  listContainer: {
    flexGrow: 1,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // More padding to extend into status bar
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleIcon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8E8E8',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activeTabText: {
    color: '#517891',
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: '#517891',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  universityInfo: {
    flex: 1,
    marginRight: 12,
  },
  universityName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    lineHeight: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  universityLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  flagContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flagIcon: {
    marginRight: 4,
  },
  flag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  cardDetails: {
    gap: 12,
  },
  domainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  universityDomain: {
    fontSize: 14,
    color: '#77B1D4',
    fontWeight: '500',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    gap: 8,
  },
  websiteText: {
    fontSize: 14,
    color: '#77B1D4',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    fontWeight: '500',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cityScroll: {
    flexDirection: 'row',
  },
  cityChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  activeCityChip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  cityChipText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  activeCityChipText: {
    color: '#517891',
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  activeSortButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  activeSortButtonText: {
    color: '#517891',
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B6B',
    marginTop: 20,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
}); 
