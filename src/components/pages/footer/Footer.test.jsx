import React from 'react'
import { it, expect, describe, vi } from 'vitest' 
import { fireEvent, render, screen, waitFor  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';


describe('Test footer', ()=>{
    it('Test render copy right with year', ()=>{
        render(<Footer/>)
        const copyright = screen.getByTestId('copyright')
        expect(copyright).toBeInTheDocument()
        expect(copyright).toHaveTextContent('© 2025')
    })
    it('Test render youtube icon', ()=>{
        render(<Footer/>)
        const youtube_icon = screen.getByTestId('youtube')
        expect(youtube_icon).toBeInTheDocument()
        expect(youtube_icon).toHaveClass('fa-brands fa-youtube youtube')
    })
    it('Test open youtube link when clicked', async ()=>{
        render(<Footer/>);
        const youtubeLink = screen.getByTestId('youtube-link');
        expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com')
        expect(youtubeLink).toHaveAttribute('target', '_blank')

    })
    it('Test render twitter icon', ()=>{
        render(<Footer/>)
        const twitter_icon = screen.getByTestId('twitter')
        expect(twitter_icon).toBeInTheDocument()
        expect(twitter_icon).toHaveClass('fa-brands fa-twitter twitter')
    })
    it('Test open twitter link when clicked', async ()=>{
        render(<Footer/>);
        const youtubeLink = screen.getByTestId('twitter-link');
        expect(youtubeLink).toHaveAttribute('href', 'https://x.com/')
        expect(youtubeLink).toHaveAttribute('target', '_blank')
    })
    it('Test render facebook icon', ()=>{
        render(<Footer/>)
        const facebook_icon = screen.getByTestId('facebook')
        expect(facebook_icon).toBeInTheDocument()
        expect(facebook_icon).toHaveClass('fa-brands fa-facebook facebook')
    })
    it('Test open facebook link when clicked', async ()=>{
        render(<Footer/>);
        const youtubeLink = screen.getByTestId('facebook-link');
        expect(youtubeLink).toHaveAttribute('href', 'https://www.facebook.com/')
        expect(youtubeLink).toHaveAttribute('target', '_blank')
    })
    it('Test render instagram icon', ()=>{
        render(<Footer/>)
        const instagram_icon = screen.getByTestId('instagram')
        expect(instagram_icon).toBeInTheDocument()
        expect(instagram_icon).toHaveClass('fa-brands fa-square-instagram instagram')
    })
    it('Test open instagram link when clicked', async ()=>{
        render(<Footer/>);
        const youtubeLink = screen.getByTestId('instagram-link');
        expect(youtubeLink).toHaveAttribute('href', 'https://www.instagram.com/')
        expect(youtubeLink).toHaveAttribute('target', '_blank')
    })
})