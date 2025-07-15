# libs/influencer-discovery/influencer_model.py
import tensorflow as tf
from sklearn.feature_extraction.text import TfidfVectorizer

class InfluencerIdentifier:
    def __init__(self):
        self.model = tf.keras.models.load_model('influencer_model.h5')
        self.vectorizer = TfidfVectorizer(max_features=10000)
        
    def find_influencers(self, niche: str, location: str, min_followers: int):
        # 1. Scrape potential candidates
        candidates = self.scraper.find_profiles(niche, location, min_followers)
        
        # 2. Extract features
        features = self.extract_features(candidates)
        
        # 3. Predict relevance scores
        scores = self.model.predict(features)
        
        # 4. Rank and filter
        return self.rank_candidates(candidates, scores)

    def extract_features(self, profiles):
        features = []
        for p in profiles:
            features.append({
                'engagement_rate': (p.avg_likes + p.avg_comments) / p.followers,
                'content_frequency': p.post_frequency,
                'niche_similarity': self.calculate_similarity(p.content_themes),
                'audience_quality': p.follower_demographics.quality_score
            })
        return self.vectorizer.transform(features)