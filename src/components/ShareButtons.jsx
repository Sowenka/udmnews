import PropTypes from 'prop-types'

// Иконки соцсетей
function VKIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.367 1.259 2.182 1.815.616.422 1.084.33 1.084.33l2.178-.03s1.14-.071.599-.972c-.044-.074-.314-.663-1.618-1.876-1.366-1.272-1.183-1.066.462-3.267.999-1.338 1.398-2.155 1.273-2.504-.12-.333-.857-.245-.857-.245l-2.453.015s-.182-.025-.317.056c-.131.079-.216.263-.216.263s-.387 1.028-.903 1.902c-1.088 1.848-1.524 1.946-1.702 1.832-.414-.266-.31-1.066-.31-1.635 0-1.777.27-2.519-.525-2.712-.264-.064-.458-.106-1.132-.113-.866-.009-1.6.003-2.014.208-.276.136-.489.44-.359.457.16.022.523.098.716.36.249.338.24 1.097.24 1.097s.143 2.093-.334 2.353c-.327.18-.777-.186-1.74-1.854-.494-.856-.867-1.8-.867-1.8s-.072-.176-.2-.27c-.155-.115-.372-.151-.372-.151l-2.33.015s-.35.01-.478.163c-.114.135-.009.414-.009.414s1.82 4.258 3.882 6.403c1.889 1.967 4.033 1.838 4.033 1.838h.973z"/>
        </svg>
    )
}

function TelegramIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
    )
}

function OKIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2zm0 2.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm4.293 7.107a1.2 1.2 0 0 1-1.697 1.697L12 13.407l-2.596 2.597a1.2 1.2 0 1 1-1.697-1.697l2.596-2.596a4.79 4.79 0 0 1-2.011-.839 1.2 1.2 0 1 1 1.416-1.938 2.4 2.4 0 0 0 2.584 0 1.2 1.2 0 1 1 1.416 1.938 4.79 4.79 0 0 1-2.011.839l2.596 2.596z"/>
        </svg>
    )
}

// MAX — пока нет публичного share URL
// function MaxIcon({ className }) {
//     return (
//         <svg className={className} viewBox="0 0 42 42" fill="currentColor">
//             <path fillRule="evenodd" d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z" clipRule="evenodd"/>
//         </svg>
//     )
// }

VKIcon.propTypes = { className: PropTypes.string }
TelegramIcon.propTypes = { className: PropTypes.string }
OKIcon.propTypes = { className: PropTypes.string }

export function ShareButtons({ url, title }) {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const shareLinks = [
        {
            name: 'VK',
            url: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}`,
            icon: VKIcon,
            color: 'hover:bg-blue-600 hover:text-white'
        },
        {
            name: 'Telegram',
            url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            icon: TelegramIcon,
            color: 'hover:bg-sky-500 hover:text-white'
        },
        {
            name: 'OK',
            url: `https://connect.ok.ru/offer?url=${encodedUrl}&title=${encodedTitle}`,
            icon: OKIcon,
            color: 'hover:bg-orange-500 hover:text-white'
        }
        // MAX — пока нет публичного share URL
        // {
        //     name: 'MAX',
        //     url: `https://max.ru/share?url=${encodedUrl}&text=${encodedTitle}`,
        //     icon: MaxIcon,
        //     color: 'hover:bg-purple-600 hover:text-white'
        // }
    ]

    const handleShare = (e, link) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(link.url, '_blank', 'width=600,height=400')
    }

    return (
        <div className="flex items-center gap-1">
            {shareLinks.map((link) => (
                <button
                    key={link.name}
                    onClick={(e) => handleShare(e, link)}
                    title={`Поделиться в ${link.name}`}
                    className={`rounded-lg p-1.5 text-gray-400 transition-all duration-200 ${link.color} dark:text-gray-500`}
                >
                    <link.icon className="h-5 w-5" />
                </button>
            ))}
        </div>
    )
}

ShareButtons.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
