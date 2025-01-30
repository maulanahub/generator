import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { requestPayment } from './SolanaPay';
import '@solana/wallet-adapter-react-ui/styles.css';
import { deployToNetlify } from './netlify';

export default function Generator() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [projectName, setProjectName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [subdomain, setSubdomain] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if development mode is enabled
    const isDevelopmentMode = process.env.REACT_APP_DEVELOPMENT_MODE === 'true';
  
    if (!isDevelopmentMode && !wallet.connected) {
      alert('Please connect your wallet.');
      return;
    }
  
    try {
      if (isDevelopmentMode) {
        // Bypass payment in development mode
        console.log('Development mode: Payment bypassed.');
        alert('Development mode: Payment bypassed. Your website will be generated shortly.');
      } else {
        // Process payment in production mode
        const amount = 0.5; // 0.5 SOL
        const signature = await requestPayment(wallet, connection, amount);
        console.log('Payment successful! Signature:', signature);
        alert('Payment successful! Your website will be generated shortly.');
      }
  
      // Generate the website
      const siteData = { projectName, tokenSymbol, description, logoUrl };
      const deploy = await deployToNetlify(subdomain, siteData);
  
      // Show the user the deployed URL
      alert(`Website deployed successfully! Visit: ${subdomain}.yourdomain.com`);
      console.log('Deploy details:', deploy);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const generateWebsite = () => {
    // Placeholder for website generation logic
    console.log('Generating website with the following details:');
    console.log({ projectName, tokenSymbol, description, logoUrl });
    // TODO: Implement website generation logic
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Build Your Meme Website
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Custom Subdomain</label>
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="myproject"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Your website will be accessible at: {subdomain}.yourdomain.com
            </p>
          </div>
          <div>
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Token Symbol</label>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Logo URL</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
          >
            {process.env.REACT_APP_DEVELOPMENT_MODE === 'true' ? 'Generate Website (Dev Mode)' : 'Proceed to Payment'}
          </button>
        </form>

        {/* Wallet Connect Button */}
        {process.env.REACT_APP_DEVELOPMENT_MODE !== 'true' && (
          <div className="mt-4 flex justify-center">
            <WalletMultiButton className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300" />
          </div>
        )}

        {/* Live Preview Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
          <div className="bg-gray-200 p-4 rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800">
                {projectName || 'Your Project Name'}
              </h2>
              <p className="text-gray-600 mt-2">
                {description || 'Your project description goes here.'}
              </p>
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Project Logo"
                  className="w-50 mt-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}