
import { Exchange } from '../../pages';
import styles from './ExchangeTable.module.css';
import Image from 'next/image';


const ExchangeTable = ({ exchanges }: {exchanges: Exchange[]}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Exchange Name</th>
                    <th>Year Established</th>
                    <th>Country</th>
                    <th>Trust Score</th>
                    <th>24h Volume (BTC)</th>
                    <th>Normalized Volume (BTC)</th>
                </tr>
            </thead>
            <tbody>
                {exchanges.map((exchange: Exchange) => (
                    <tr key={exchange.id} onClick={() => window.open(exchange.url, '_blank')}>
                        <td className={styles.centeredCell}>
                            <Image
                                src={exchange.image}
                                alt={`${exchange.name} logo`}
                                width={20}
                                height={20}
                                className={styles.logo}
                            />
                            {exchange.name}
                        </td>
                        <td>{exchange.year_established || 'N/A'}</td>
                        <td>{exchange.country || 'N/A'}</td>
                        <td>{exchange.trust_score}</td>
                        <td>{exchange.trade_volume_24h_btc?.toFixed(2)}</td>
                        <td>{exchange.trade_volume_24h_btc_normalized?.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default ExchangeTable