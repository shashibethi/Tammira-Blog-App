import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag, clearTags } from '../store/slices/blogSlice';
import { RootState, AppDispatch } from '../store/store';

interface TagFilterProps {
  availableTags?: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ availableTags = [] }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTags = useSelector((state: RootState) => state.blogs.selectedTags);

  const handleTagToggle = (tag: string) => {
    selectedTags.includes(tag) ? dispatch(removeTag(tag)) : dispatch(addTag(tag));
  };

  const handleClearAll = () => dispatch(clearTags());
  const uniqueTags = [...new Set(availableTags)].sort();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-md flex items-center justify-center mr-2">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </span>
          Filter by Tags
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs md:text-sm text-pink-500 hover:text-pink-600 font-medium flex items-center"
          >
            Clear All
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="mb-4 p-3 bg-pink-50 rounded-lg border border-pink-100">
          <p className="text-xs font-medium text-gray-700 mb-2 flex items-center">
            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-1.5"></span>
            Active Filters:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => dispatch(removeTag(tag))}
                className="flex items-center px-2.5 py-1 text-xs font-medium text-white bg-pink-500 rounded-full hover:bg-pink-600"
              >
                #{tag}
                <svg className="w-2.5 h-2.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-gray-700 mb-3 flex items-center">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5"></span>
          Available Tags ({uniqueTags.length}):
        </p>
        {uniqueTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  selectedTags.includes(tag)
                    ? 'text-purple-600 bg-purple-50 border-purple-200'
                    : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
                }`}
              >
                #{tag}
                {selectedTags.includes(tag) && (
                  <span className="ml-1 text-purple-500">✓</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-gray-500 text-xs font-medium">No tags available</p>
          </div>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100 text-center">
            <p className="text-xs font-medium text-gray-700">
              {selectedTags.length} filter{selectedTags.length !== 1 ? 's' : ''} active
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;