import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Calendar, MapPin, Users, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AnimatedInput from '../../components/ui/AnimatedInput';
import AnimatedButton from '../../components/ui/AnimatedButton';
import { useEvents } from '../../hooks/useEvents';

const AddEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    society: 'Computer Society',
    date: '',
    time: '',
    venue: '',
    capacity: 50,
    tags: '',
    image: ''
  });

  const societies = ['Computer Society', 'Communication Society', 'SIGHT', 'WIE'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const eventData = {
        ...formData,
        society: formData.society as any,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        image: formData.image || 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg',
        isPast: false
      };

      addEvent(eventData);
      setSuccess(true);
      setIsLoading(false);

      // Redirect after success
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    }, 1000);
  };

  if (success) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        <div className="flex-1 flex items-center justify-center md:ml-80">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Created!</h2>
            <p className="text-gray-600 mb-6">
              Your event has been successfully created and is now live.
            </p>
            <Link
              to="/admin/dashboard"
              className="inline-block px-6 py-3 bg-[#0057B7] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden md:ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 md:hidden mr-4"
            >
              <Menu size={20} />
            </button>
            <Link
              to="/admin/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
              <p className="text-gray-600">Add a new event to the IEEE calendar</p>
            </div>
          </div>
        </header>

        {/* Form */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <AnimatedInput
                        name="title"
                        label="Event Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IEEE Society
                      </label>
                      <select
                        name="society"
                        value={formData.society}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent"
                        required
                      >
                        {societies.map(society => (
                          <option key={society} value={society}>{society}</option>
                        ))}
                      </select>
                    </div>

                    <AnimatedInput
                      name="capacity"
                      type="number"
                      label="Capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Details</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={6}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0057B7] focus:border-transparent resize-none"
                        placeholder="Provide a detailed description of the event..."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <AnimatedInput
                        name="date"
                        type="date"
                        label="Event Date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                      
                      <AnimatedInput
                        name="time"
                        type="time"
                        label="Event Time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />

                      <AnimatedInput
                        name="venue"
                        label="Venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <AnimatedInput
                      name="tags"
                      label="Tags (comma-separated)"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., Workshop, AI, Python, Beginner"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Event Image</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-gray-600">Upload event image or provide URL</p>
                      <AnimatedInput
                        name="image"
                        type="url"
                        label="Image URL (optional)"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs text-gray-500">
                        Leave blank to use default image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {formData.title || 'Event Title'}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.society} • {formData.date} • {formData.venue}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Capacity: {formData.capacity} participants
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end space-x-4">
                  <Link
                    to="/admin/dashboard"
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </Link>
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Event...' : 'Create Event'}
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEvent;